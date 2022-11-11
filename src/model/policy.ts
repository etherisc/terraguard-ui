import { Moment } from "moment";

export enum PolicyStatus {
    ACTIVE,
    APPLIED,
    EXPIRED,
    PAYED_OUT
}

export interface PolicyRowView {
    id: string;
    walletAddress: string;
    insuredAmount: string;
    coverageUntil: string;
    status: string;
}
