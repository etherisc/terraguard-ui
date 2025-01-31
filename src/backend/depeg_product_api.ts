import DepegProductBuild from '@etherisc/depeg-contracts/build/contracts/DepegProduct.json';
import { Coder } from "abi-coder";
import { BigNumber, ContractReceipt, ContractTransaction, Signer, VoidSigner } from "ethers";
import { IInstanceService } from "../contracts/depeg-contracts";
import { DepegState } from "../types/depeg_state";
import { TransactionFailedError } from "../utils/error";
import { getInstanceService, getTerraGuardRiskpool } from "./gif_registry";
import { APPLICATION_STATE_UNDERWRITTEN, PAYOUT_STATE_EXPECTED, PAYOUT_STATE_PAIDOUT, PolicyData } from "./policy_data";
import { ComponentState } from '../types/component_state';
import { mapComponentState } from '../utils/component';
import { TerraGuardProduct, TerraGuardProduct__factory, TerraGuardRiskpool } from '../contracts/terraguard-poc-contracts';

export class DepegProductApi {

    private depegProductAddress: string;
    private signer: Signer;
    private depegProduct?: TerraGuardProduct;
    private depegRiskpool?: TerraGuardRiskpool;
    private depegRiskpoolId?: number;
    private instanceService?: IInstanceService;
    // the factor to calculate the protected amount based on the sum insured 
    private protectedAmountFactor = 1;

    constructor(
        depegProductAddress: string,
        signer: Signer
    ) {
        this.depegProductAddress = depegProductAddress;
        this.signer = signer;
    }

    async initialize() {
        this.depegProduct = TerraGuardProduct__factory.connect(this.depegProductAddress, this.signer);
        const registryAddress = await this.depegProduct.getRegistry();
        this.instanceService = await getInstanceService(registryAddress, this.signer);
        this.depegRiskpoolId = (await this.depegProduct.getRiskpoolId()).toNumber();
        this.depegRiskpool = await getTerraGuardRiskpool(this.instanceService, this.depegRiskpoolId);
        this.protectedAmountFactor = 100 / (await this.depegRiskpool.getSumInsuredPercentage()).toNumber();
    }

    isInitialized(): boolean {
        return this.instanceService !== undefined && this.depegRiskpool !== undefined && this.depegRiskpoolId !== undefined;
    }

    getRiskpoolId(): number {
        return this.depegRiskpoolId ?? 0;
    }

    isVoidSigner(): boolean {
        return this.signer instanceof VoidSigner;
    }

    getSigner(): Signer {
        return this.signer;
    }

    getDepegProduct(): TerraGuardProduct {
        return this.depegProduct!;
    }
    
    getDepegRiskpool(): TerraGuardRiskpool {
        return this.depegRiskpool!;
    }

    getInstanceService(): IInstanceService {
        return this.instanceService!;
    }

    async getUsd2Address(): Promise<string> {
        return await this.depegProduct!.getToken();
    }

    extractProcessIdFromApplicationLogs(logs: any[]): string|undefined {
        const productAbiCoder = new Coder(DepegProductBuild.abi);
        let processId = undefined;
    
        logs.forEach(log => {
            try {
                const evt = productAbiCoder.decodeEvent(log.topics, log.data);
                console.log(evt);
                if (evt.name === 'LogDepegPolicyCreated') {
                    console.log(evt);
                    // @ts-ignore
                    processId = evt.values.processId.toString();
                }
            } catch (e) {
                console.log(e);
            }
        });
    
        return processId;
    }
    
    async applyForDepegPolicy(
        walletAddress: string,
        protectedAmount: BigNumber, 
        locationId: number,
        latitude: number,
        longitude: number,
        protectionType: number,
        premium: BigNumber,
        beforeApplyCallback?: (address: string) => void,
        beforeWaitCallback?: (address: string) => void,
    ): Promise<[ContractTransaction, ContractReceipt]> {
        if (beforeApplyCallback !== undefined) {
            beforeApplyCallback(this.depegProduct!.address);
        }
        try {
            const offsetLat = await this.depegProduct!.OFFSET_LAT();
            const offsetLon = await this.depegProduct!.OFFSET_LONG();
            const coordDecimals = await this.depegProduct!.COORD_DECIMALS();
            console.log("offsetLat", offsetLat.toString(), "offsetLon", offsetLon.toString(), "coordDecimals", coordDecimals.toString());
            const lat = parseInt((latitude * Math.pow(10, coordDecimals)).toFixed(0)) + offsetLat;
            const lon = parseInt((longitude * Math.pow(10, coordDecimals)).toFixed(0)) + offsetLon;
            console.log("lat", lat.toString(), "lon", lon.toString());
            const tx = await this.depegProduct!.applyForPolicy(
                protectionType,
                lat,
                lon,
                locationId,
                protectedAmount, 
                premium);
            if (beforeWaitCallback !== undefined) {
                beforeWaitCallback(this.depegProduct!.address);
            }
            const receipt = await tx.wait();
            // console.log(receipt);
            return [tx, receipt];
        } catch (e) {
            console.log("caught error while applying for policy: ", e);
            // @ts-ignore e.code
            throw new TransactionFailedError(e.code, e);
        }
    }
    
    async getPoliciesCount(
        ownerWalletAddress: string
    ): Promise<number> {
        return (await this.depegProduct!.processIds(ownerWalletAddress)).toNumber();        
    }
    
    async getPolicies(
        ownerWalletAddress: string
    ): Promise<Array<PolicyData>> {
        console.log("getPolicies", ownerWalletAddress);
        const numPolicies = (await this.depegProduct!.processIds(ownerWalletAddress)).toNumber();
    
        const policies = new Array();
        
        for (let i = 0; i < numPolicies; i++) {
            const policy = await this.getPolicyForProduct(ownerWalletAddress, i);
            policies.push(policy);
        }
    
        return policies;
    }
    
    
    async getPolicy(
        ownerWalletAddress: string,
        idx: number,
        checkClaim: boolean,
    ): Promise<PolicyData> {
        console.log("getPolicy", ownerWalletAddress, idx);
        const policy = await this.getPolicyForProduct(ownerWalletAddress, idx);

        const offsetLat = await this.depegProduct!.OFFSET_LAT();
        const offsetLon = await this.depegProduct!.OFFSET_LONG();
        const coordDecimals = await this.depegProduct!.COORD_DECIMALS();
        
        policy.latitude = ( policy.latitude - offsetLat ) / Math.pow(10, coordDecimals);
        policy.longitude = ( policy.longitude - offsetLon) / Math.pow(10, coordDecimals);

        return policy;
    }
    
    async getPolicyForProduct(
            ownerWalletAddress: string,
            idx: number,
            ): Promise<PolicyData> {
        console.log("getPolicyForProduct", ownerWalletAddress, idx);
        const processId = await this.depegProduct!.getProcessId(ownerWalletAddress, idx);
        console.log("processId", processId);
        const { state, premiumAmount, sumInsuredAmount, data, createdAt } = await this.instanceService!.getApplication(processId);
        console.log("application state", state);
        const { owner } = await this.instanceService!.getMetadata(processId);
        let policyState = undefined;
        let payoutState = undefined;
        if ( state == APPLICATION_STATE_UNDERWRITTEN ) {
            const policy = await this.instanceService!.getPolicy(processId);
            [ policyState ] = policy;
            const claimsCount = (await this.instanceService!.claims(processId)).toNumber();
            if (claimsCount > 0) {
                const payoutCount = (await this.instanceService!.payouts(processId)).toNumber();
                if (payoutCount > 0) {
                    payoutState = PAYOUT_STATE_PAIDOUT;
                } else {
                    payoutState = PAYOUT_STATE_EXPECTED;
                }
            }
        }
        const { protectionType, latitude, longitude, locationId } = await this.depegProduct!.decodeApplicationParameterFromData(data);
        return {
            id: processId,
            policyHolder: owner,
            // protectedWallet: wallet,
            applicationState: state,
            policyState: policyState,
            payoutState: payoutState,
            createdAt: createdAt.toNumber(),
            premium: premiumAmount.toString(),
            protectedAmount: sumInsuredAmount.mul(this.protectedAmountFactor).toString(),
            payoutCap: sumInsuredAmount.toString(),
            // duration: duration.toNumber(),
            isAllowedToClaim: false,
            protectionType: protectionType,
            latitude: latitude,
            longitude: longitude,
            locationId: locationId,
        } as PolicyData;
    }

    async getDepegState(): Promise<DepegState> {
        // const state = await this.depegProduct!.getDepegState();
        // switch (state) {
        //     case 0:
        //     case 1:
                return DepegState.Active;
        //     case 2:
        //         return DepegState.Paused;
        //     case 3:
        //         return DepegState.Depegged;
        //     default:
        //         throw new Error("Unknown product state: " + state);
        // }
    }

    async claim(
        processId: string,
        beforeApplyCallback?: (address: string) => void,
        beforeWaitCallback?: (address: string) => void,
    ): Promise<[ContractTransaction, ContractReceipt]> {
        if (beforeApplyCallback !== undefined) {
            beforeApplyCallback(this.depegProduct!.address);
        }
        // try {
        //     const tx = await this.depegProduct!.createDepegClaim(processId)
        //     if (beforeWaitCallback !== undefined) {
        //         beforeWaitCallback(this.depegProduct!.address);
        //     }
        //     const receipt = await tx.wait();
        //     // console.log(receipt);
        //     return [tx, receipt];
        // } catch (e) {
        //     console.log("caught error while creating a depeg claim: ", e);
        //     // @ts-ignore e.code
        //     throw new TransactionFailedError(e.code, e);
        // }
        return [undefined!, undefined!];
    }

    extractClaimIdFromLogs(logs: any[]): string|undefined {
        const productAbiCoder = new Coder(DepegProductBuild.abi);
        let claimId = undefined;
    
        logs.forEach(log => {
            try {
                const evt = productAbiCoder.decodeEvent(log.topics, log.data);
                console.log(evt);
                if (evt.name === 'LogDepegClaimCreated') {
                    console.log(evt);
                    // @ts-ignore
                    claimId = evt.values.claimId.toString();
                }
            } catch (e) {
                console.log(e);
            }
        });
    
        return claimId;
    }

    async getComponentState(): Promise<ComponentState> {
        const state = await this.instanceService?.getComponentState(await this.depegProduct!.getId());
        return mapComponentState(state!);
    }

}

