import { BigNumber } from "ethers/lib/ethers";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { ApplicationApi, BackendApi, BundleManagementApi } from "./backend_api";
import { delay } from "../utils/delay";
import { BundleData } from "./bundle_data";
import { PolicyData } from "./policy_data";
import dayjs from "dayjs";
import { DepegState } from "../types/depeg_state";
import { ComponentState } from "../types/component_state";

export function BackendApiMock(enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey) {
    return {
        usd1: 'USDC',
        usd1Decimals: 6,
        usd2: 'USDT',
        usd2Decimals: 6,
        getWalletAddress(): Promise<string> {
            return Promise.resolve("0x2CeC4C063Fef1074B0CD53022C3306A6FADb4729");
        },
        async hasUsd2Balance(walletAddress: string, amount: BigNumber): Promise<boolean> {
            return Promise.resolve(true);
        },
        async createTreasuryApproval(walletAddress: string, premium: BigNumber) {
            enqueueSnackbar(`Approval mocked (${walletAddress}, ${premium}`,  { autoHideDuration: 3000, variant: 'info' });
            await delay(2000);
            return Promise.resolve(true);
        },
        async policy(walletAddress: string, idx: number, checkClaim: boolean): Promise<PolicyData> {
            return Promise.resolve(mockPolicies[idx]);
        },
        async policies(walletAddress: string): Promise<Array<PolicyData>> {
            return Promise.resolve(mockPolicies);
        },
        async policiesCount(walletAddress: string): Promise<number> {
            return Promise.resolve(mockPolicies.length);
        },
        async getDepegState() {
            return Promise.resolve(DepegState.Active);
        },
        application: applicationMock(enqueueSnackbar),
        bundleManagement: bundleManagementMock(enqueueSnackbar),
        triggerBundleUpdate(bundleId: number) {
            return Promise.resolve({} as BundleData);
        },
        priceFeed: {
            getLatestPrice(priceRetrieved: (price: PriceInfo) => void): Promise<void> {
                return Promise.resolve();
            },
            getLatestProductState(stateRetrieved: (triggeredAt: number, depeggedAt: number) => void): Promise<void> {
                return Promise.resolve();
            },
            getPrice(roundId: BigNumber, priceRetrieved: (price: PriceInfo) => void): Promise<void> {
                return Promise.resolve();
            },
            getAllPricesAfter(after, priceRetrieved, loadingStarted, loadingFinished) {
                return Promise.resolve();
            },
        },
        isTrxMined(txHash: string): Promise<boolean> {
            return Promise.resolve(true);
        },
    } as BackendApi;
}

const mockPoliciesActive = [
    {
        id: '0x54E190322453300229D2BE2A38450B8A8BD8CF61',
        policyHolder: '0x2CeC4C063Fef1074B0CD53022C3306A6FADb4729',
        protectedWallet: '0x2CeC4C063Fef1074B0CD53022C3306A6FADb4729',
        applicationState: 2,
        policyState: 0,
        createdAt: dayjs().add(-2, 'days').unix(),
        duration: 14 * 24 * 60 * 60,
        premium: BigNumber.from(17).toString(),
        protectedAmount: BigNumber.from(10000).toString()
    } as PolicyData,
    {
        id: '0x54E190322453300229D2BE2A38450B8A8BD8CF62',
        policyHolder: '0x2CeC4C063Fef1074B0CD53022C3306A6FADb4729',
        protectedWallet: '0x2CeC4C063Fef1074B0CD53022C3306A6FADb4729',
        applicationState: 2,
        policyState: 0,
        payoutState: 0,
        createdAt: dayjs().add(-2, 'days').unix(),
        duration: 14 * 24 * 60 * 60,
        premium: BigNumber.from(17).toString(),
        protectedAmount: BigNumber.from(11000000000).toString()
    } as PolicyData,
    {
        id: '0x54E190322453300229D2BE2A38450B8A8BD8CF63',
        policyHolder: '0x2CeC4C063Fef1074B0CD53022C3306A6FADb4729',
        protectedWallet: '0x2CeC4C063Fef1074B0CD53022C3306A6FADb4729',
        applicationState: 2,
        policyState: 0,
        payoutState: 1,
        createdAt: dayjs().add(-2, 'days').unix(),
        duration: 14 * 24 * 60 * 60,
        premium: BigNumber.from(17).toString(),
        protectedAmount: BigNumber.from(12000000000).toString()
    } as PolicyData,
    {
        id: '0x34e190322453300229d2be2a38450b8a8bd8cf64',
        policyHolder: '0xdCeC4C063Fef1074B0CD53022C3306A6FADb4729',
        protectedWallet: '0x2CeC4C063Fef1074B0CD53022C3306A6FADb4729',
        applicationState: 0,
        createdAt: dayjs().add(-1, 'days').unix(),
        duration: 47 * 24 * 60 * 60,
        premium: BigNumber.from(27).toString(),
        protectedAmount: BigNumber.from(15000000000).toString()
    } as PolicyData,
];

const mockPolicies = mockPoliciesActive.concat(
    {
        id: '0x23e190322453300229d2be2a38450b8a8bd8cf71',
        policyHolder: '0xFEeC4C063Fef1074B0CD53022C3306A6FADb4729',
        protectedWallet: '0x2CeC4C063Fef1074B0CD53022C3306A6FADb4729',
        applicationState: 2,
        policyState: 1,
        createdAt: dayjs().add(-20, 'days').unix(),
        duration: 14 * 24 * 60 * 60,
        premium: BigNumber.from(100).toString(),
        protectedAmount: BigNumber.from(35000).toString()
    } as PolicyData,
    {
        id: '0xc23223453200229d2be2a38450b8a8bd8cf72',
        policyHolder: '0x821c4C063Fef1074B0CD53022C3306A6FADb4729',
        protectedWallet: '0x2CeC4C063Fef1074B0CD53022C3306A6FADb4729',
        applicationState: 2,
        policyState: 2,
        createdAt: dayjs().add(-3, 'months').unix(),
        duration: 28 * 24 * 60 * 60,
        premium: BigNumber.from(67).toString(),
        protectedAmount: BigNumber.from(36000000000).toString()
    } as PolicyData,
);

const bundles = [
    {
        "id": 21,
        "riskpoolId": 11,
        "owner": "0x2CeC4C063Fef1074B0CD53022C3306A6FADb4729",
        "apr": 2.5,
        "minProtectedAmount": BigNumber.from(2300000000).toString(),
        "maxProtectedAmount": BigNumber.from(2500000000).toString(),
        "minDuration": 1987200,
        "maxDuration": 2160000,
        "capital": BigNumber.from(100000000000).toString(),
        "locked": BigNumber.from(0).toString(),
        "capacity": BigNumber.from(100000000000).toString(),
        "policies": 0,
        "state": 0,
        "tokenId": 21,
        "createdAt": 1672758484,
        "name": "jabababado",
        "lifetime": (90 * 24 * 60 * 60).toString(),
    } as BundleData
];

function applicationMock(enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey) {
    return {
        protectedAmountMin: BigNumber.from(3000000000),
        protectedAmountMax: BigNumber.from(10000000000),
        coverageDurationDaysMin: 14,
        coverageDurationDaysMax: 45,
        getRiskBundles(handleBundle: (bundle: BundleData) => void) {
        },
        fetchStakeableRiskBundles(handleBundle) {
        },
        calculatePremium(walletAddress: string, insuredAmount: BigNumber, coverageDurationSeconds: number, bundle: BundleData): Promise<BigNumber> {
            const premium = insuredAmount.toNumber() * 0.017 * coverageDurationSeconds / 365;
            return Promise.resolve(BigNumber.from(premium));
        },
        async applyForPolicy(walletAddress, insuredAmount, latitude, longitude, coverageDurationSeconds, bundleId, gasless) {
            enqueueSnackbar(`Policy mocked (${walletAddress}, ${insuredAmount}, ${coverageDurationSeconds})`,  { autoHideDuration: 3000, variant: 'info' });
            await delay(2000);
            return Promise.resolve({ status: true, processId: "0x12345678"});
        },
        lastBlockTimestamp(): Promise<number> {
            return Promise.resolve(dayjs().unix());
        },
        claim(policyId: string) {
            return Promise.resolve({ status: true, claimId: "0x1"});
        },
        getProductComponentState() {
            return Promise.resolve(ComponentState.Active);
        },
        fetchPending(walletAddress, handlePending) {
            return Promise.resolve();
        },
    } as ApplicationApi
}

function bundleManagementMock(enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey) {
    return {
        usd1: 'USDC',
        minLifetime: 14,
        maxLifetime: 180,
        minStakedAmount: BigNumber.from(25000000000),
        maxStakedAmount: BigNumber.from(100000000000),
        minProtectedAmount: BigNumber.from(1000000000),
        maxProtectedAmount: BigNumber.from(25000000000),
        minProtectionDuration: 14,
        maxProtectionDuration: 90,
        annualPctReturn: 5,
        maxAnnualPctReturn: 20,
        isRiskpoolCapacityAvailable() {
            return Promise.resolve(true);
        },
        riskpoolRemainingCapacity() {
            return Promise.resolve(BigNumber.from(10000000000000));
        },
        async isAllowAllAccountsEnabled(): Promise<boolean> {
            return Promise.resolve(true);
        },
        isInvestorWhitelisted(walletAddress: string) {
            return Promise.resolve(true);
        },
        async stake(
            name: string,
            lifetime: number,
            investorWalletAddress: string, 
            stakedAmount: BigNumber, 
            // minProtectedAmount: BigNumber, 
            // maxProtectedAmount: BigNumber, 
            // minDuration: number, 
            // maxDuration: number, 
            // annualPctReturn: number
        ): Promise<{ status: boolean, bundleId: string | undefined}> {
            enqueueSnackbar(
                `Riskpool mocked ($name, $lifetime, $investorWalletAddress, $stakedAmount, $minProtectedAmount, $maxProtectedAmount, $minDuration, $maxDuration, $annualPctReturn)`,
                { autoHideDuration: 3000, variant: 'info' }
            );
            await delay(2000);
            return Promise.resolve({ status: true, bundleId: "42"});
        },
        fetchAllBundles(handleBundle: (bundle: BundleData) => void) {
            bundles.forEach(handleBundle);
            return Promise.resolve();
        },
        bundleTokenAddress(): Promise<string> {
            return Promise.resolve("0x0000000000000000000000000000000000000000");
        },
        bundleCount(): Promise<number> {
            return Promise.resolve(2);
        },
        bundleId(idx) {
            return Promise.resolve(idx);
        },
        bundle(bundleId: number, walletAddress: string): Promise<BundleData|undefined> {
            return Promise.resolve(undefined);
        },
        maxBundles(): Promise<number> {
            return Promise.resolve(100);
        },
        activeBundles(): Promise<number> {
            return Promise.resolve(2);
        },
        async lockBundle(bundleId: number): Promise<boolean> {
            return Promise.resolve(true);
        },
        async unlockBundle(bundleId: number): Promise<boolean> {
            return Promise.resolve(true);
        },
        async closeBundle(bundleId: number): Promise<boolean> {
            return Promise.resolve(true);
        },
        async burnBundle(bundleId: number): Promise<boolean> {
            return Promise.resolve(true);
        },
        async withdrawBundle(bundleId: number): Promise<boolean> {
            return Promise.resolve(true);
        },
        async fundBundle(bundleId: number): Promise<boolean> {
            return Promise.resolve(true);
        },
        getBundleCapitalCap(): Promise<BigNumber> {
            return Promise.resolve(BigNumber.from(100000000000));
        },
        getBundleLifetimeMin(): Promise<number> {
            return Promise.resolve(14 * 24 * 60 * 60);
        },
        getBundleLifetimeMax(): Promise<number> {
            return Promise.resolve(180 * 24 * 60 * 60);
        },
        async getProtectedAmountFactor(): Promise<number> {
            return Promise.resolve(5);
        },
        getRiskpoolComponentState() {
            return Promise.resolve(ComponentState.Active);
        },
    } as BundleManagementApi;
};
