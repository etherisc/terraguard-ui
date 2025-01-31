import { Alert, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import confetti from "canvas-confetti";
import { BigNumber, Signer } from "ethers";
import { useTranslation } from 'next-i18next';
import { SnackbarKey, useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BackendApi } from "../../backend/backend_api";
import { BundleData } from "../../backend/bundle_data";
import useNotifications from "../../hooks/notifications";
import useTransactionNotifications from "../../hooks/trx_notifications";
import { addBundle, finishLoading, reset, setProductComponentState, startLoading } from "../../redux/slices/application";
import { setProductDepegState } from "../../redux/slices/price";
import { RootState, store } from "../../redux/store";
import { ComponentState } from "../../types/component_state";
import { DepegState } from "../../types/depeg_state";
import { ApprovalFailedError, TransactionFailedError } from "../../utils/error";
import { ga_event } from "../../utils/google_analytics";
import ApplicationForm from "./application_form";
import PolicyConfirmation from "./policy_confirmation";
import { fetchBalances } from "../../redux/thunks/account";
import { useRouter } from "next/router";

export interface ApplicationProps {
    insurance: BackendApi;
}

const steps = ['step0', 'step1', 'step2', 'step3', 'step4'];
export const REVOKE_INFO_URL = "https://metamask.zendesk.com/hc/en-us/articles/4446106184731-How-to-revoke-smart-contract-allowances-token-approvals";

export default function Application(props: ApplicationProps) {
    const { t } = useTranslation(['application', 'common']);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    useTransactionNotifications();
    const { showPersistentErrorSnackbarWithCopyDetails } = useNotifications();
    const router = useRouter();

    const signer = useSelector((state: RootState) => state.chain.signer);
    const isConnected = useSelector((state: RootState) => state.chain.isConnected);
    const productComponentState = useSelector((state: RootState) => state.application.productComponentState);
    const productDepegState = useSelector((state: RootState) => state.price.productDepegState);
    const dispatch = useDispatch();

    const [ activeStep, setActiveStep ] = useState(isConnected ? 0 : 1);
    const [ formDisabled, setFormDisabled ] = useState(true);
    const [ walletAddress, setWalletAddress ] = useState("");
    const [ readyToBuy, setReadyToBuy ] = useState(false);
    const [ premiumTrxTextKey, setPremiumTrxTextKey ] = useState("");
    // processId, walletAddress, amount, duration (days)
    const [ protectionDetails, setProctectionDetails ] = useState(["0x", "0x", BigNumber.from(0), 30]);

    async function walletDisconnected() {
        setWalletAddress("");
    }

    // get bundle data once the wallet is connected
    useEffect(() => {
        async function asyncGetProductStateAndBundles() {
            const productComponentState = await props.insurance.application.getProductComponentState();
            dispatch(setProductComponentState(productComponentState));
            const depegState = await props.insurance.getDepegState();
            dispatch(setProductDepegState(depegState));
            await props.insurance.application.fetchStakeableRiskBundles((bundle: BundleData) => dispatch(addBundle(bundle)));
            dispatch(finishLoading());
            setPremiumTrxTextKey("");
        }

        // console.log("signer", signer);
        if (isConnected) {
            dispatch(startLoading());
            dispatch(reset());
            setPremiumTrxTextKey('bundle_loading');
            asyncGetProductStateAndBundles();
        }    
    }, [isConnected, dispatch, props.insurance]);
    
    // change steps according to application state
    useEffect(() => {
        if (! isConnected) {
            setActiveStep(0);
            walletDisconnected();
        } else if (activeStep < 1 && isConnected) {
            setActiveStep(1);
            updateWalletAddress(signer!);
        } else if (activeStep == 1 && readyToBuy) {
            setActiveStep(2);
        } else if (activeStep == 2 && !readyToBuy) { 
            setActiveStep(1);
        } else if (activeStep > 4) { // application completed
            setFormDisabled(true);
        }
    }, [signer, isConnected, activeStep, readyToBuy]);

    useEffect(() => {
        if (activeStep < 1 || activeStep > 2) {
            setFormDisabled(true);
        } else {
            setFormDisabled(false);
        }
    }, [activeStep]);

    function readyToSubmit(isFormReady: boolean) {
        setReadyToBuy(isFormReady);
    }

    async function applicationSuccessful() {
        // props.insurance.triggerBundleUpdate(bundleId, dispatch);

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        store.dispatch(fetchBalances(signer!));
        router.push("/policies");
    }

    async function doApproval(walletAddress: string, premium: BigNumber): Promise<Boolean> {
        try {
            return await props.insurance.createTreasuryApproval(
                walletAddress, 
                premium, 
            );
        } catch(e) { 
            if ( e instanceof ApprovalFailedError) {
                console.log("approval failed", e);
                showPersistentErrorSnackbarWithCopyDetails(
                    t('error.approval_failed', { ns: 'common', error: e.code }),
                    e.reason
                );
                return Promise.resolve(false);
            } else {
                throw e;
            }
        }
    }

    async function doApplication(walletAddress: string, protectedAmount: BigNumber, latitude: number, longitude: number,
        locationId: number, protectionType: number, premium: BigNumber): Promise<{ status: boolean, processId: string|undefined}> {
        let snackbar: SnackbarKey | undefined = undefined;
        // const applyMessage = gasless ? t('apply_info_gasless') : t('apply_info');
        try {
            return await props.insurance.application.applyForPolicy(
                walletAddress, 
                protectedAmount, 
                latitude,
                longitude,
                protectionType,
                locationId,
                premium,
                (address: string) => {
                    snackbar = enqueueSnackbar(
                        t(t('apply_info'), { address }),
                        { variant: "warning", persist: true }
                    );
                },
                () => {
                    if (snackbar !== undefined) {
                        closeSnackbar(snackbar);
                    }
                    snackbar = enqueueSnackbar(
                        t('apply_wait'),
                        { variant: "info", persist: true }
                    );
                });
        } catch(e) { 
            if ( e instanceof TransactionFailedError) {
                console.log("transaction failed", e);
                if (snackbar !== undefined) {
                    closeSnackbar(snackbar);
                }

                showPersistentErrorSnackbarWithCopyDetails(
                    t('error.transaction_failed', { ns: 'common', error: e.code }),
                    e.reason
                );
                return Promise.resolve({ status: false, processId: undefined });
            } else {
                throw e;
            }
        } finally {
            if (snackbar !== undefined) {
                closeSnackbar(snackbar);
            }
        }
    }

    function showAllowanceNotice() {
        enqueueSnackbar(
            (<>
                {t('error.allowance_revoke_notice', { ns: 'common' })}&nbsp;
                <a href={REVOKE_INFO_URL} target="_blank" rel="noreferrer">here</a>
            </>),
            { 
                variant: "info", 
                persist: true,
                action: (key) => {
                    return (
                        <Button onClick={() => {closeSnackbar(key)}}>{t('action.close', { ns: 'common' })}</Button>
                    );
                }
            }
        );
    }

    function enableUnloadWarning(enable: boolean) {
        if (enable) {
            window.onbeforeunload = function() {
                return t('warning.unload_page', { ns: 'common' });
            }
        } else {
            window.onbeforeunload = null;
        }
    }

    async function applyForPolicy(insuredAmount: BigNumber, latitude: number, longitude: number, locationId: number, protectionType: number, premium: BigNumber) {
        ga_event("trx_start_application", { category: 'chain_trx' });
        try {
            enableUnloadWarning(true);

            setActiveStep(3);
            const approvalSuccess = await doApproval(walletAddress, premium);
            if ( ! approvalSuccess) {
                ga_event("trx_fail_application_approve", { category: 'chain_trx' });
                setActiveStep(2);
                showAllowanceNotice();
                return;
            }
            ga_event("trx_success_application_approve", { category: 'chain_trx' });
            setActiveStep(4);
            const applicationResult = await doApplication(walletAddress, insuredAmount, latitude, longitude, locationId, protectionType, premium);
            if ( ! applicationResult.status ) {
                ga_event("trx_fail_application", { category: 'chain_trx' });
                setActiveStep(2);
                showAllowanceNotice();
                return;
            }
            ga_event("trx_success_application", { category: 'chain_trx' });
            setActiveStep(5);
            await applicationSuccessful();
            // setProctectionDetails([applicationResult.processId as string, walletAddress, insuredAmount, coverageDurationSeconds])
        } finally {
            enableUnloadWarning(false);
        }
    }

    async function updateWalletAddress(signer: Signer) {
        setWalletAddress(await signer.getAddress());
    }

    if (isConnected) {
        updateWalletAddress(signer!);
    }

    let content;
    if (activeStep < 5) {
        content = (
            <ApplicationForm 
                formDisabled={formDisabled || productDepegState !== DepegState.Active || productComponentState !== ComponentState.Active}
                connectedWalletAddress={walletAddress}
                usd1={props.insurance.usd1}
                usd1Decimals={props.insurance.usd1Decimals}
                usd2={props.insurance.usd2}
                usd2Decimals={props.insurance.usd2Decimals}
                hasBalance={(walletAddress, amount) => props.insurance.hasUsd2Balance(walletAddress, amount)}
                applicationApi={props.insurance.application}
                readyToSubmit={readyToSubmit}
                applyForPolicy={applyForPolicy}
                premiumTrxTextKey={premiumTrxTextKey}
            />
        );
    // } else {
    //     content = (
    //         <PolicyConfirmation
    //             processId={protectionDetails[0] as string}
    //             wallet={protectionDetails[1] as string}
    //             amount={protectionDetails[2] as BigNumber}
    //             coverageDurationSeconds={protectionDetails[3] as number}
    //             currency={props.insurance.usd1}
    //             currencyDecimals={props.insurance.usd1Decimals}
    //             />);
    }

    return (
        <>
            <div>
                <Typography variant="h6" mb={2}>Buy TerraGuard earthquake protection</Typography>

                <Stepper activeStep={activeStep} sx={{ display: { 'xs': 'none', 'md': 'flex' }}}>
                    {steps.map((label) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{t(label)}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                { (productComponentState !== ComponentState.Active || productDepegState !== DepegState.Active) && 
                    <Alert severity="error" variant="outlined" sx={{ mt: 4 }}>{t('alert.product_not_active')}</Alert>
                }
                
                {content}
            </div>
        </>
    );
}