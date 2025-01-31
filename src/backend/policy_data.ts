import { BigNumber } from "ethers/lib/ethers";

export interface PolicyData {
    id: string;
    policyHolder: string;
    protectedWallet: string;
    applicationState: number;
    policyState?: number;
    payoutState?: number;
    createdAt: number;
    duration: number;
    premium: string;
    protectedAmount: string;
    payoutCap: string;
    isAllowedToClaim: boolean;
    claim: ClaimData | undefined;
    transactionHash: string;
    protectionType: number;
    latitude: number;
    longitude: number;
    locationId: number;
}

export enum PolicyState {
    UNKNOWN, 
    APPLIED, REVOKED, UNDERWRITTEN, DECLINED,
    ACTIVE, EXPIRED, CLOSED, 
    CLAIMABLE, PAYOUT_EXPECTED, PAIDOUT, 
    PENDING_MINING,
}

export interface ClaimData {
    state: ClaimState;
    actualAmount: string;
    paidAmount: string | undefined;
    claimAmount: string;
    claimCreatedAt: number;
}

export enum ClaimState {
    APPLIED, CONFIRMED, DECLINED, CLOSED
}

export const APPLICATION_STATE_APPLIED = 0;
export const APPLICATION_STATE_REVOKED = 1;
export const APPLICATION_STATE_UNDERWRITTEN = 2;
export const APPLICATION_STATE_DECLINED = 3;
export const APPLICATION_STATE_PENDING_MINING = 99;

export const POLICY_STATE_ACTIVE = 0;
export const POLICY_STATE_EXPIRED = 1;
export const POLICY_STATE_CLOSED = 2;

export const PAYOUT_STATE_EXPECTED = 0;
export const PAYOUT_STATE_PAIDOUT = 1;


