import IRiskpoolBuild from '@etherisc/gif-interface/build/contracts/IRiskpool.json';
import { Coder } from "abi-coder";
import { BigNumber, ContractReceipt, ContractTransaction } from "ethers";
import { DepegRiskpool, IInstanceService } from "../contracts/depeg-contracts";
import { finish, start, waitingForTransaction, waitingForUser } from "../redux/slices/transaction";
import { store } from "../redux/store";
import { TrxType } from "../types/trxtype";
import { minBigNumber } from '../utils/bignumber';
import { TransactionFailedError } from "../utils/error";
import { isStakingSupported } from "../utils/staking";
import { BundleData, MAX_BUNDLE } from "./bundle_data";
import StakingApi from "./staking_api";
import { ComponentState } from '../types/component_state';
import { mapComponentState } from '../utils/component';
import { TerraGuardRiskpool } from '../contracts/terraguard-poc-contracts';

export class DepegRiskpoolApi {

    private depegRiskpool: TerraGuardRiskpool;
    private riskpoolId: number;
    private instanceService: IInstanceService;
    private stakingApi?: StakingApi;
    // private minBundleLifetime = -1;
    // private maxBundleLifetime = -1;
    // assume 100k usdc as default - will be overwritten by contract
    private bundleCap = BigNumber.from(100000000000).toString();
    // assume 1m usdc as default - will be overwritten by contract
    private riskpoolCap = BigNumber.from(1000000000000).toString();
    // the factor to calculate the protected amount based on the sum insured 
    private protectedAmountFactor = 1;

    constructor(
        riskpool: TerraGuardRiskpool,
        riskpoolId: number,
        instanceService: IInstanceService,
        usd2Decimals: number,
        // signer: Signer,
    ) {
        this.depegRiskpool = riskpool;
        this.riskpoolId = riskpoolId;
        this.instanceService = instanceService;


        const stakingAddress = process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS;
        if (stakingAddress !== undefined) {
            this.stakingApi = new StakingApi(stakingAddress, riskpool.signer, instanceService);
        }
    }

    async initialize(): Promise<void> {
        if (this.stakingApi !== undefined) {
            await this.stakingApi.initialize();
        }

        // this.minBundleLifetime = (await this.depegRiskpool.MIN_BUNDLE_LIFETIME()).toNumber();
        // this.maxBundleLifetime = (await this.depegRiskpool.MAX_BUNDLE_LIFETIME()).toNumber();
        this.bundleCap = (await this.depegRiskpool.getBundleCapitalCap()).toString();
        this.riskpoolCap = (await this.depegRiskpool.getRiskpoolCapitalCap()).toString();
        this.protectedAmountFactor = 100 / (await this.depegRiskpool.getSumInsuredPercentage()).toNumber();
    }

    async getCapital(): Promise<BigNumber> {
        return await this.depegRiskpool.getCapital();
    }

    async getBundleData(
    ): Promise<Array<BundleData>> {
        console.log("depegRiskpool.bundles");
        const numBundles = (await this.depegRiskpool.bundles()).toNumber();
        console.log("number of bundles: " + numBundles);
    
        let bundleData = new Array<BundleData>();
    
        for (let i = 0; i < numBundles; i++) {
            console.log("depegRiskpool.getBundleId", i);
            const bundleId = (await this.depegRiskpool.getBundleId(i)).toNumber();
            // console.log('bundleId', bundleId);
            const bundle = await this.getBundleDataByBundleId(bundleId);
            bundleData.push(bundle);
        }
    
        return Promise.resolve(bundleData);
    }
    
    async getBundleDataByBundleId(bundleId: number): Promise<BundleData> {
        console.log("depegRiskpool.getBundleInfo", bundleId);
        const { name, state, tokenId, owner, lifetime, minSumInsured, maxSumInsured, minDuration, maxDuration, annualPercentageReturn, capital, lockedCapital, createdAt, balance } = await this.depegRiskpool.getBundleInfo(bundleId);
        const apr = 100 * annualPercentageReturn.toNumber() / (await this.depegRiskpool.getApr100PercentLevel()).toNumber();
        console.log("depegRiskpool.getActivePolicies", bundleId);
        const policies = await this.depegRiskpool.getActivePolicies(bundleId);
        const capacity = capital.sub(lockedCapital).mul(this.protectedAmountFactor);
        let capitalSupport = undefined;
        let supportedCapacity = undefined;
        let supportedCapacityRemaining = undefined;
    
        // if (this.stakingApi !== undefined) {
        //     capitalSupport = await this.stakingApi.getSupportedCapital(bundleId);
        //     supportedCapacity = capitalSupport?.mul(this.protectedAmountFactor);
        //     supportedCapacityRemaining = minBigNumber(capacity, supportedCapacity);
        // }

        return {
            id: bundleId,
            riskpoolId: this.riskpoolId,
            owner: owner,
            apr: apr,
            minProtectedAmount: minSumInsured.mul(this.protectedAmountFactor).toString(),
            maxProtectedAmount: maxSumInsured.mul(this.protectedAmountFactor).toString(),
            minDuration: minDuration.toNumber(),
            maxDuration: maxDuration.toNumber(),
            balance: balance.toString(),
            capital: capital.toString(),
            locked: lockedCapital.toString(),
            capitalSupport: BigNumber.from(0).toString(),
            supportedCapacity: BigNumber.from(0).toString(),
            supportedCapacityRemaining: BigNumber.from(0).toString(),
            capacity: capacity.toString(),
            policies: policies.toNumber(),
            state: state,
            tokenId: tokenId.toNumber(),
            createdAt: createdAt.toNumber(),
            name: name,
            lifetime: lifetime.toString(),
        } as BundleData;
    }
    
    getBestQuote(
        bundleData: Array<BundleData>, 
        sumInsured: BigNumber, 
        duration: number,
        lastBlockTimestamp: number
    ): BundleData {
        return bundleData.reduce((best, bundle) => {
            if (lastBlockTimestamp > (bundle.createdAt + parseInt(bundle.lifetime))) {
                return best;
            }
            const minSumInsured = BigNumber.from(bundle.minProtectedAmount);
            const maxSumInsured = BigNumber.from(bundle.maxProtectedAmount);
            if (sumInsured.lt(minSumInsured)) {
                console.log("sumInsured less that min sum insured", sumInsured, bundle);
                return best;
            }
            if (sumInsured.gt(maxSumInsured)) {
                console.log("sumInsured greater that max sum insured", sumInsured, bundle);
                return best;
            }
            if (duration < bundle.minDuration) {
                console.log("duration less that min duration", duration, bundle);
                return best;
            }
            if (duration > bundle.maxDuration) {
                console.log("duration greater that max duration", duration, bundle);
                return best;
            }
            if (best.apr < bundle.apr) {
                console.log("bundle apr larger than best apr so far (best, bundle)", best, bundle);
                return best;
            }
            const capacity = BigNumber.from(bundle.capacity);
            if (sumInsured.gt(capacity)) {
                console.log("sumInsured greater than capacity", sumInsured, bundle);
                return best;
            }
            if (isStakingSupported) {
                if (bundle.capitalSupport === undefined) {
                    console.log("no stakes defined on bundle", bundle);
                    return best;
                }
                const lockedCapital = BigNumber.from(bundle.locked);
                const stakesRemaining = BigNumber.from(bundle.capitalSupport).sub(lockedCapital)
                if (stakesRemaining.lte(0)) {
                    console.log("no stakes remaining on bundle", bundle);
                    return best;
                }
            }
            console.log("bundle selected", bundle);
            return bundle;
        }, MAX_BUNDLE);
    }
    
    async createBundle(
        name: string,
        lifetime: number,
        investorWalletAddress: string, 
        investedAmount: BigNumber, 
        // minSumInsured: BigNumber, 
        // maxSumInsured: BigNumber, 
        // minDuration: number, 
        // maxDuration: number, 
        // annualPctReturn: number,
        beforeInvestCallback?: (address: string) => void,
        beforeWaitCallback?: (address: string) => void
    ): Promise<[ContractTransaction, ContractReceipt]> {
        console.log("createBundle", investorWalletAddress, investedAmount);//, minSumInsured, maxSumInsured, minDuration, maxDuration, annualPctReturn);
        const apr100Level = await this.depegRiskpool.getApr100PercentLevel();
        // const apr = annualPctReturn * apr100Level.toNumber() / 100;
        const riskpoolAddress = this.depegRiskpool.address;
        if (beforeInvestCallback) {
            beforeInvestCallback(riskpoolAddress);
        }
        try {
            // const tx = await this.depegRiskpool["createBundle(string,uint256,uint256,uint256,uint256,uint256,uint256,uint256)"](
            const tx = await this.depegRiskpool["createBundle(string,uint256,uint256)"](
                name,
                lifetime,
                // minSumInsured, 
                // maxSumInsured, 
                // minDuration * 86400, 
                // maxDuration * 86400, 
                // apr, 
                investedAmount);
            if (beforeWaitCallback !== undefined) {
                beforeWaitCallback(riskpoolAddress);
            }
            const receipt = await tx.wait();
            return Promise.resolve([tx, receipt]);
        } catch (e) {
            console.log("caught error while creating bundle: ", e);
            // @ts-ignore e.code
            throw new TransactionFailedError(e.code, e);
        }
    }
    
    extractBundleIdFromApplicationLogs(logs: any[]): string|undefined {
        const riskpoolAbiCoder = new Coder(IRiskpoolBuild.abi);
        let bundleId = undefined;
    
        logs.forEach(log => {
            try {
                const evt = riskpoolAbiCoder.decodeEvent(log.topics, log.data);
                console.log(evt);
                if (evt.name === 'LogRiskpoolBundleCreated') {
                    // console.log(evt);
                    // @ts-ignore
                    bundleId = evt.values.bundleId.toString();
                }
            } catch (e) {
                console.log(e);
            }
        });
    
        return bundleId;
    }
    
    async getBundleTokenAddress(): Promise<string> {
        console.log("getBundleTokenAddress");
        return await this.instanceService.getBundleToken();
    }
    
    async getBundleCount(): Promise<number> {
        console.log("getBundleCount");
        return (await this.depegRiskpool.bundles()).toNumber();
    }
    
    async getBundleId(idx: number): Promise<number> {
        // console.log("getBundleId");
        return (await this.depegRiskpool.getBundleId(idx)).toNumber();
    }
    
    /**
     * Get the bundle data for a given bundle id from the blockchain. 
     * Attention workaround: 
     * This implementation is not very efficient, as it iterates over all bundles
     * and checks if riskpool and token owner are a match. This is due to the fact 
     * that the framework currently does not privide a way to retvieve a list of 
     * nft tokens for a given owner.
     */
    async getBundle(
        bundleId: number,
        walletAddress?: string, 
    ): Promise<BundleData|undefined> {
        // console.log("getBundle", bundleId);
        const bundle = await this.getBundleDataByBundleId(bundleId);
        // console.log(bundle);
        if (walletAddress !== undefined && bundle.owner !== walletAddress) {
            // owner mismatch
            console.log("owner mismatch");
            return undefined;
        }
        return bundle;
    }

    async activeBundles(): Promise<number> {
        return (await this.instanceService.activeBundles(this.riskpoolId)).toNumber();
    }

    async getMaxBundles(): Promise<number> {
        return (await this.instanceService.getMaximumNumberOfActiveBundles(this.riskpoolId)).toNumber();
    }

    async lockBundle(
        bundleId: number,
    ): Promise<[ContractTransaction, ContractReceipt]> {
        console.log("riskpoolapi - lockBundle");
        const riskpoolAddress = this.depegRiskpool.address;
        store.dispatch(start({ type: TrxType.BUNDLE_LOCK }));
        store.dispatch(waitingForUser({ active: true, params: { address: riskpoolAddress }}));
        try {
            const tx = await this.depegRiskpool.lockBundle(bundleId);
            store.dispatch(waitingForTransaction({ active: true, params: { address: riskpoolAddress }}));
            const receipt = await tx.wait();
            return Promise.resolve([tx, receipt]);
        } catch (e) {
            console.log("caught error while locking bundle: ", e);
            // @ts-ignore e.code
            throw new TransactionFailedError(e.code, e);
        } finally {
            store.dispatch(finish());
        }
    }

    async unlockBundle(
        bundleId: number,
    ): Promise<[ContractTransaction, ContractReceipt]> {
        console.log("riskpoolapi - unlockBundle");
        const riskpoolAddress = this.depegRiskpool.address;
        store.dispatch(start({ type: TrxType.BUNDLE_UNLOCK }));
        store.dispatch(waitingForUser({ active: true, params: { address: riskpoolAddress }}));
        try {
            const tx = await this.depegRiskpool.unlockBundle(bundleId);
            store.dispatch(waitingForTransaction({ active: true, params: { address: riskpoolAddress }}));
            const receipt = await tx.wait();
            return Promise.resolve([tx, receipt]);
        } catch (e) {
            console.log("caught error while unlocking bundle: ", e);
            // @ts-ignore e.code
            throw new TransactionFailedError(e.code, e);
        } finally {
            store.dispatch(finish());
        }
    }

    async closeBundle(
        bundleId: number,
    ): Promise<[ContractTransaction, ContractReceipt]> {
        console.log("riskpoolapi - closeBundle");
        const riskpoolAddress = this.depegRiskpool.address;
        store.dispatch(start({ type: TrxType.BUNDLE_CLOSE }));
        store.dispatch(waitingForUser({ active: true, params: { address: riskpoolAddress }}));
        try {
            const tx = await this.depegRiskpool.closeBundle(bundleId);
            store.dispatch(waitingForTransaction({ active: true, params: { address: riskpoolAddress }}));
            const receipt = await tx.wait();
            return Promise.resolve([tx, receipt]);
        } catch (e) {
            console.log("caught error while closing bundle: ", e);
            // @ts-ignore e.code
            throw new TransactionFailedError(e.code, e);
        } finally {
            store.dispatch(finish());
        }
    }

    async burnBundle(
        bundleId: number,
    ): Promise<[ContractTransaction, ContractReceipt]> {
        console.log("riskpoolapi - burnBundle");
        const riskpoolAddress = this.depegRiskpool.address;
        store.dispatch(start({ type: TrxType.BUNDLE_BURN }));
        store.dispatch(waitingForUser({ active: true, params: { address: riskpoolAddress }}));
        try {
            const tx = await this.depegRiskpool.burnBundle(bundleId);
            store.dispatch(waitingForTransaction({ active: true, params: { address: riskpoolAddress }}));
            const receipt = await tx.wait();
            return Promise.resolve([tx, receipt]);
        } catch (e) {
            console.log("caught error while burning bundle: ", e);
            // @ts-ignore e.code
            throw new TransactionFailedError(e.code, e);
        } finally {
            store.dispatch(finish());
        }
    }

    async withdrawBundle(
        bundleId: number,
        amount: BigNumber,
    ): Promise<[ContractTransaction, ContractReceipt]> {
        console.log("riskpoolapi - withdrawBundle");
        const riskpoolAddress = this.depegRiskpool.address;
        store.dispatch(start({ type: TrxType.BUNDLE_WITHDRAW }));
        store.dispatch(waitingForUser({ active: true, params: { address: riskpoolAddress }}));
        try {
            const tx = await this.depegRiskpool.defundBundle(bundleId, amount);
            store.dispatch(waitingForTransaction({ active: true, params: { address: riskpoolAddress }}));
            const receipt = await tx.wait();
            return Promise.resolve([tx, receipt]);
        } catch (e) {
            console.log("caught error while withdrawing from bundle: ", e);
            // @ts-ignore e.code
            throw new TransactionFailedError(e.code, e);
        } finally {
            store.dispatch(finish());
        }
    }

    async fundBundle(
        bundleId: number,
        amount: BigNumber,
    ): Promise<[ContractTransaction, ContractReceipt]> {
        console.log("riskpoolapi - fundBundle");
        const riskpoolAddress = this.depegRiskpool.address;
        store.dispatch(start({ type: TrxType.BUNDLE_FUND }));
        store.dispatch(waitingForUser({ active: true, params: { address: riskpoolAddress }}));
        try {
            const tx = await this.depegRiskpool.fundBundle(bundleId, amount);
            store.dispatch(waitingForTransaction({ active: true, params: { address: riskpoolAddress }}));
            const receipt = await tx.wait();
            return Promise.resolve([tx, receipt]);
        } catch (e) {
            console.log("caught error while withdrawing from bundle: ", e);
            // @ts-ignore e.code
            throw new TransactionFailedError(e.code, e);
        } finally {
            store.dispatch(finish());
        }
    }

    getRiskpoolCapitalCap(): BigNumber {
        return BigNumber.from(this.riskpoolCap);
    }

    getBundleCapitalCap(): BigNumber {
        return BigNumber.from(this.bundleCap);
    }

    getBundleLifetimeMin(): number {
        // return this.minBundleLifetime;
        return 90 * 24 * 60 * 60;
    }

    getBundleLifetimeMax(): number {
        return 365 * 24 * 60 * 60;
    }

    async isAllowAllAccountsEnabled(): Promise<boolean> {
        return this.depegRiskpool.isAllowAllAccountsEnabled();
    }

    async isAllowedAccount(account: string): Promise<boolean> {
        return this.depegRiskpool.isAllowed(account);
    }

    getProtectedAmountFactor(): number {
        return this.protectedAmountFactor;
    }

    async getComponentState(): Promise<ComponentState> {
        const state = await this.instanceService?.getComponentState(await this.depegRiskpool!.getId());
        return mapComponentState(state!);
    }

}

