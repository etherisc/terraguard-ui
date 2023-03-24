import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { parseUnits } from '@ethersproject/units';
import { PriceFeedState } from '../../types/price_feed_state';
import { ProductState } from '../../types/product_state';
import moment from 'moment';

export type PriceState = {
    symbol: string,
    name: string,
    decimals: number,
    latest: PriceInfo,
    // timestamp when price was triggered or 0 if not triggered
    triggeredAt: number,
    // timestamp when price was depegged or 0 if not depegged
    depeggedAt: number,
    // price history
    history: Array<PriceInfo>,
    // indicates if price history is loading
    historyLoading: boolean,
    // show all prices after this timestamp
    historyAfter: number,
    // used for testing only - disables dynamic updates from price feed
    noUpdates: boolean,
    // this is used to indicate if issuing of new policies is allowed
    productState: ProductState,
}

const initialPrice = {
    roundId: "0",
    price: parseUnits("0.0", 8).toString(),
    timestamp: 0,
} as PriceInfo;


const initialState: PriceState = {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 8,
    latest: initialPrice,
    triggeredAt: 0,
    depeggedAt: 0,
    history: [], // no initial history
    historyLoading: false,
    historyAfter: moment().add(-2, "d").unix(),
    noUpdates: false,
    productState: ProductState.Active,
}

export const priceSlice = createSlice({
    name: 'price',
    initialState,
    reducers: {
        setCoin: (state, action: PayloadAction<{ symbol: string, name: string, decimals: number}>) => {
            state.symbol = action.payload.symbol;
            state.name = action.payload.name;
            state.decimals = action.payload.decimals;
        },
        addPrice: (state, action: PayloadAction<PriceInfo>) => {
            if (state.noUpdates) return;
            // update latest price if newer price
            if (action.payload.roundId > state.latest.roundId) {
                state.latest = action.payload;
            }

            // check if roundid exists in history and insert if not
            const index = state.history.findIndex((p) => p.roundId === action.payload.roundId);
            if (index === -1) {
                const nextRoundIndex = state.history.findIndex((p) => action.payload.roundId < p.roundId );
                console.log(nextRoundIndex);
                if (nextRoundIndex === -1) {
                    state.history.push(action.payload);
                } else {
                    state.history.splice(nextRoundIndex, 0, action.payload);
                }
            }
        },
        historyLoading: (state) => {
            state.historyLoading = true;
        },
        historyLoadingFinished: (state) => {
            state.historyLoading = false;
        },
        loadPriceFeedHistory: (state, action: PayloadAction<PriceInfo[]>) => {
            state.history = action.payload;
            state.latest = action.payload[action.payload.length - 1];
        },
        setHistoryAfter: (state, action: PayloadAction<number>) => {
            state.historyAfter = action.payload;
        },
        setTriggeredAt: (state, action: PayloadAction<number>) => {
            if (state.noUpdates) return;
            state.triggeredAt = action.payload;
        },
        setDepeggedAt: (state, action: PayloadAction<number>) => {  
            if (state.noUpdates) return;
            state.depeggedAt = action.payload;
        },
        setNoUpdates: (state, action: PayloadAction<boolean>) => {
            state.noUpdates = action.payload;
        },
        setProductState: (state, action: PayloadAction<ProductState>) => {
            if (state.noUpdates) return;
            state.productState = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { 
    setCoin,
    addPrice,
    historyLoading,
    historyLoadingFinished,
    setHistoryAfter,
    loadPriceFeedHistory,
    setTriggeredAt,
    setDepeggedAt,
    setNoUpdates,
    setProductState,
} = priceSlice.actions;

export default priceSlice.reducer;

