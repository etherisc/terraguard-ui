import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { Repository } from "redis-om";
import { AggregatorV3Interface } from "../../../contracts/chainlink-contracts";
import { AggregatorV3Interface__factory, DepegProduct__factory, UsdcPriceDataProvider__factory } from "../../../contracts/depeg-contracts";
import { getBackendVoidSigner } from "../../../utils/chain";
import { redisOmClient } from "../../../utils/redis";
import { clearAllPrices } from "./clear";
import { Price, PRICE_SCHEMA } from "./redis_price_objects";
import { isIpAllowedToConnect } from "../../../utils/check_ip";

const depegProductContractAddress = process.env.NEXT_PUBLIC_TERRAGUARD_CONTRACT_ADDRESS ?? "0x0";

/**
 * Fetch new prices from chainlink and save them to redis. 
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<number>
) {
    console.log("called /api/prices/fetch");

    if (! isIpAllowedToConnect(req, res)) {
        return;
    }

    const aggregator = await getAggregator();
    const priceRepository = await getPriceRepository();

    const latestPrice = await priceRepository.search().sortBy('aggregatorRoundId', 'DESC').return.first();
    console.log("latestPrice", latestPrice);

    const numPrices = await fetchPrices(aggregator, latestPrice, priceRepository);    

    res.status(200).json(numPrices);
    console.log("prices update finished");
}

/**
 * Fetches all prices (or only prices never than the last fetched price) from chainlink price feed aggregator and stores them in redis.
 */
export async function fetchPrices(aggregator: AggregatorV3Interface, priceFromLastFetch: Price|null, priceRepository: Repository<Price>): Promise<number> {
    const prices: PriceData[] = [];
    console.log("fetching latest round data");
    let roundData = await aggregator.latestRoundData();
    let { phaseId, aggregatorRoundId } = splitRoundId(roundData.roundId);
    console.log("latestRoundData", formatUnits(roundData.roundId, 0), "(", phaseId, aggregatorRoundId, ")", roundData.updatedAt.toNumber(), roundData.answer.toNumber());

    if (priceFromLastFetch !== null && priceFromLastFetch.phaseId !== phaseId) {
        await clearAllPrices(priceRepository);
    }

    let numPricesFetched = 0;
    let roundIdToFetch = roundData.roundId;
    
    while(true) {
        let { phaseId, aggregatorRoundId } = splitRoundId(roundIdToFetch);

        if (stopFetching(aggregatorRoundId, priceFromLastFetch?.aggregatorRoundId ?? null)) {
            break;
        }

        console.log("fetching round data", formatUnits(roundIdToFetch, 0));
        roundData = await aggregator.getRoundData(roundIdToFetch);
        console.log("roundData", formatUnits(roundData.roundId, 0), "(", phaseId, aggregatorRoundId, ")", roundData.updatedAt.toNumber(), roundData.answer.toNumber());

        // abort loop if round not found
        if (roundData.roundId.eq(0)) {
            console.log("roundId is 0, stopping");
            break;
        }

        ++numPricesFetched;
        // store price to redis
        priceRepository.createAndSave({ 
            roundId: roundData.roundId.toString(), 
            price: roundData.answer.toNumber(), 
            timestamp: new Date(roundData.updatedAt.toNumber() * 1000), 
            phaseId, 
            aggregatorRoundId
        });
        roundIdToFetch = roundIdToFetch.sub(1);
    } 
    
    console.log("price fetch finished. fetched", prices.length, "prices");
    return numPricesFetched;
}

function stopFetching(aggregatorRoundId: number, lastFetchAggregatorRoundId: number | null): Boolean {
    if ( aggregatorRoundId === 0 ) {
        console.log("aggregatorRoundId is 0, stopping");
        return true;
    }

    if ( lastFetchAggregatorRoundId !== null && aggregatorRoundId <= lastFetchAggregatorRoundId) {
        console.log("aggregatorRoundId is lower than last fetched price, stopping");
        return true;
    }

    return false
}

export function splitRoundId(roundId: BigNumber): { phaseId: number, aggregatorRoundId: number } {
    const phaseId = roundId.shr(64).toNumber();
    // Note: this found be '0xFFFFFFFFFFFFFFFF' but since javascript (es5) can't handle 64 bit numbers, we have to use 52 bits (which should be enough to handle the chainlink feed for a while)
    const aggregatorRoundId = roundId.and(0xFFFFFFFFFFFFF).toNumber();
    return { phaseId, aggregatorRoundId };
}

async function getAggregator(): Promise<AggregatorV3Interface> {
    const signer = await getBackendVoidSigner();
    let address = process.env.NEXT_PUBLIC_CHAINLINK_PRICEFEED_CONTRACT_ADDRESS;

    if (address === undefined) {
        const depegProduct = DepegProduct__factory.connect(depegProductContractAddress, signer);
        const priceDataProviderAddress = await depegProduct.getPriceDataProvider();
        const priceDataProvider = UsdcPriceDataProvider__factory.connect(priceDataProviderAddress, signer);
        address = await priceDataProvider.getChainlinkAggregatorAddress();
    }

    console.log("aggregator address", address);

    return AggregatorV3Interface__factory.connect(address, signer);
}

export async function getPriceRepository() {
    const priceRepository = (await redisOmClient).fetchRepository(PRICE_SCHEMA);
    priceRepository.createIndex();
    return priceRepository;
}