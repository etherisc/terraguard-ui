import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField'
import moment from 'moment';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BundleData } from '../../backend/bundle_data';
import { ApplicationApi } from '../../backend/insurance_api';
import { BalanceTooSmallError, NoBundleFoundError } from '../../utils/error';
import Premium from './premium';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield } from "@fortawesome/free-solid-svg-icons";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { INPUT_VARIANT } from '../../config/theme';
import { DatePicker } from '@mui/x-date-pickers';

export interface ApplicationFormProperties {
    formDisabled: boolean;
    walletAddress: string;
    usd1: string;
    usd1Decimals: number;
    usd2: string;
    usd2Decimals: number;
    applicationApi: ApplicationApi;
    bundles: Array<BundleData>;
    premiumTrxTextKey: string|undefined;
    formReadyForApply: (isFormReady: boolean) => void;
    applyForPolicy: (walletAddress: string, insuredAmount: number, coverageDuration: number, premium: number) => void;
}

export type IAplicationFormValues = {
    insuredWallet: string;
    insuredAmount: number;
    coverageDuration: number;
    coverageEndDate: string;
    premiumAmount: number;
    termsAndConditions: boolean;
};

export default function ApplicationForm(props: ApplicationFormProperties) {
    const { t } = useTranslation('application');

    // update wallet address when it changes
    useEffect(() => {
        setValue("insuredWallet", props.walletAddress);
    }, [props.walletAddress]);

    const [ insuredAmountMin, setInsuredAmountMin ] = useState(props.applicationApi.insuredAmountMin);
    const [ insuredAmountMax, setInsuredAmountMax ] = useState(props.applicationApi.insuredAmountMax);

    // coverage period (days and date)
    const [ coverageDaysMin, setCoverageDaysMin ] = useState(props.applicationApi.coverageDurationDaysMin);
    const [ coverageDaysMax, setCoverageDaysMax ] = useState(props.applicationApi.coverageDurationDaysMax);
    const coverageUntilMin = moment().add(props.applicationApi.coverageDurationDaysMin, 'days');
    const coverageUntilMax = moment().add(props.applicationApi.coverageDurationDaysMax, 'days');

    const { handleSubmit, control, formState, getValues, setValue, watch } = useForm<IAplicationFormValues>({ 
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            insuredWallet: "",
            insuredAmount: undefined,
            coverageDuration: props.applicationApi.coverageDurationDaysMax,
            coverageEndDate: moment().add(props.applicationApi.coverageDurationDaysMax, 'days').format("YYYY-MM-DD"),
            premiumAmount: undefined,
            termsAndConditions: false,
        }
    });

    // premium
    const premium = useMemo(() => getValues("premiumAmount"), [getValues]);
    const [ premiumErrorKey, setPremiumErrorKey ] = useState("");
    const [ premiumCalculationInProgress, setPremiumCalculationInProgress ] = useState(false);
    const [ showAvailableBundles, setShowAvailableBundles ] = useState(false);

    
    // handle changes in coverage duration / end date and update the other field accordingly
    const watchCoverageDuration = watch("coverageDuration");
    useEffect(() => {
        console.log("watchCoverageDuration", watchCoverageDuration);
        setValue("coverageEndDate", moment().startOf('day').add(watchCoverageDuration, 'days').format("YYYY-MM-DD"));
    }, [watchCoverageDuration, setValue]);

    const watchCoverageEndDate = watch("coverageEndDate");
    useEffect(() => {
        setValue("coverageDuration", moment(watchCoverageEndDate).startOf('day').diff(moment().startOf('day'), 'days')); 
        // this is a special case as changing date with date picker does not trigger the `watchPremiumFactors` useEffect
        calculatePremium();
    }, [watchCoverageEndDate, setValue]);


    const errors = useMemo(() => formState.errors, [formState]);
    const [ premiumCalculationRequired, setPremiumCalculationRequired ] = useState(false);

    // triggers premium calculation when any of the factors change and a calculation is required
    // this works for all values except the date picker which is handled separately in the `watchCoverageEndDate` useEffect
    const watchPremiumFactors = watch(["insuredWallet", "insuredAmount", "coverageDuration"]);
    useEffect(() => {
        console.log("watchPremiumFactors", premiumCalculationRequired, watchPremiumFactors, errors);
        if (premiumCalculationRequired && !errors.insuredAmount && !errors.insuredWallet && !errors.coverageDuration) {
            calculatePremium();
        } else if (premiumCalculationRequired) {
            setValue("premiumAmount", 0);
        }
        setPremiumCalculationRequired(false);
    }, [watchPremiumFactors, errors, premiumCalculationRequired]);

    //-------------------------------------------------------------------------
    // update min/max sum insured and coverage period when bundles are available
    useEffect(() => {
        if (props.bundles.length > 0) {
            let minSumInsured = Number.MAX_SAFE_INTEGER;
            let maxSumInsured = 0;
            let minCoverageSecs = Number.MAX_SAFE_INTEGER;
            let maxCoverageSecs = 0;
            for( let b of props.bundles) {
                if (b.minSumInsured < minSumInsured) {
                    minSumInsured = b.minSumInsured;
                }
                if (b.maxSumInsured > maxSumInsured) {
                    maxSumInsured = b.maxSumInsured;
                }
                if (b.minDuration < minCoverageSecs) {
                    minCoverageSecs = b.minDuration;
                }
                if (b.maxDuration > maxCoverageSecs) {
                    maxCoverageSecs = b.maxDuration;
                }
            }
            setInsuredAmountMin(minSumInsured / Math.pow(10, props.usd1Decimals));
            setInsuredAmountMax(maxSumInsured / Math.pow(10, props.usd1Decimals));
            const minCoverageDays = minCoverageSecs / 86400;
            const maxCoverageDays = maxCoverageSecs / 86400;
            setCoverageDaysMin(minCoverageDays);
            setCoverageDaysMax(maxCoverageDays);
            const coverageDays = maxCoverageDays < 30 ? maxCoverageDays : 30;
            setValue("coverageDuration", coverageDays);
            setValue("coverageEndDate", moment().add(coverageDays, 'days').format("YYYY-MM-DD"));
        }
    }, [props.bundles, props.usd1Decimals, setValue]);


    //-------------------------------------------------------------------------
    // calculate premium via onchain call
    const calculatePremium = useCallback( async () => {
        const values = getValues();
        console.log('calculatePremium', values, formState.errors);

        if (formState.touchedFields.insuredAmount === undefined) {
            console.log("amount not touched, not calculating premium...");
            return;
        }

        if (errors.coverageDuration !== undefined || errors.insuredWallet !== undefined || errors.insuredAmount !== undefined) {
            console.log("Form is invalid, not calculating premium...");
            return;
        }

        if (props.bundles.length == 0) {
            console.log("No bundles, not calculating premium...");
            setValue("premiumAmount", 0);
            return;
        }

        const walletAddress = values.insuredWallet;
        const insuredAmount = values.insuredAmount * Math.pow(10, props.usd1Decimals);
        const coverageDays = values.coverageDuration;

        console.log("Calculating premium...");
        try {
            setPremiumCalculationInProgress(true);
            setShowAvailableBundles(false);
            const premium = await props.applicationApi.calculatePremium(walletAddress, insuredAmount, coverageDays, props.bundles);
            setValue("premiumAmount", premium / Math.pow(10, props.usd1Decimals));
            setPremiumErrorKey("");
        } catch (e) {
            if (e instanceof NoBundleFoundError) {
                console.log("No bundle found for this insurance.");
                setPremiumErrorKey('error_no_matching_bundle_found');
                setShowAvailableBundles(true);
            } else if (e instanceof BalanceTooSmallError) {
                console.log("Wallet balance too low");
                setPremiumErrorKey('error_wallet_balance_too_low');
            } else {
                console.log("Error calculating premium: ", e);
            }
            setValue("premiumAmount", -1);
        } finally {
            setPremiumCalculationInProgress(false);
        }
    }, [formState, errors, props.bundles]);


    const [ applicationInProgress, setApplicationInProgress ] = useState(false);

    const onSubmit: SubmitHandler<IAplicationFormValues> = async data => {
        console.log("submit clicked", data);
        setApplicationInProgress(true);

        try {
            const values = getValues();
            const walletAddress = values.insuredWallet;
            const insuredAmountWei = values.insuredAmount * Math.pow(10, props.usd1Decimals);
            const coverageDays = values.coverageDuration;
            const premiumWei = values.premiumAmount * Math.pow(10, props.usd2Decimals);
            await props.applyForPolicy(walletAddress, insuredAmountWei, coverageDays, premiumWei);
        } finally {
            setApplicationInProgress(false);
        }
    }

    const loadingBar = applicationInProgress ? <LinearProgress /> : null;
    
    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container maxWidth={{ 'xs': 'none', 'md': 'md'}} spacing={4} mt={{ 'xs': 0, 'md': 2 }} 
                sx={{ p: 1, ml: { 'xs': 'none', 'md': 'auto'}, mr: { 'xs': 'none', 'md': 'auto'} }} >
                <Grid item xs={12}>
                    <Controller
                        name="insuredWallet"
                        control={control}
                        rules={{ required: true, maxLength: 42, minLength: 42, pattern: /^0x[a-fA-F0-9]{40}$/ }}
                        render={({ field }) => 
                            <TextField 
                                label={t('insuredWallet')}
                                fullWidth
                                disabled={props.formDisabled}
                                variant={INPUT_VARIANT}
                                {...field} 
                                InputProps={{ readOnly: true }}
                                onBlur={e => { field.onBlur(); setPremiumCalculationRequired(true); }}
                                error={errors.insuredWallet !== undefined}
                                helperText={errors.insuredWallet !== undefined 
                                    ? ( 
                                        errors.insuredWallet.type == 'pattern' 
                                            ? t(`error.field.walletType`, { "ns": "common"}) 
                                            : t(`error.field.${errors.insuredWallet.type}`, { "ns": "common", "minLength": 42, "maxLength": 42}) 
                                    )
                                    : ""}
                                />}
                        />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="insuredAmount"
                        control={control}
                        rules={{ required: true, min: insuredAmountMin, max: insuredAmountMax, pattern: /^[0-9.,]+$/ }}
                        render={({ field }) => 
                            <TextField 
                                label={t('insuredAmount')}
                                fullWidth
                                disabled={props.formDisabled}
                                variant={INPUT_VARIANT}
                                {...field} 
                                onBlur={e => { field.onBlur(); setPremiumCalculationRequired(true); }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{props.usd1}</InputAdornment>,
                                }}
                                error={errors.insuredAmount !== undefined}
                                helperText={errors.insuredAmount !== undefined 
                                    ? ( errors.insuredAmount.type == 'pattern' 
                                            ? t(`error.field.amountType`, { "ns": "common"}) 
                                            : t(`error.field.${errors.insuredAmount.type}`, { "ns": "common", "minValue": `${props.usd1} ${insuredAmountMin}`, "maxValue": `${props.usd1} ${insuredAmountMax}` })
                                    ) : ""}
                                />}
                        />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="coverageDuration"
                        control={control}
                        rules={{ required: true, min: coverageDaysMin, max: coverageDaysMax, pattern: /^[0-9]+$/ }}
                        render={({ field }) => 
                            <TextField 
                                label={t('coverageDurationDays')}
                                fullWidth
                                disabled={props.formDisabled}
                                variant={INPUT_VARIANT}
                                {...field} 
                                onBlur={e => { field.onBlur(); setPremiumCalculationRequired(true); }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{t('days')}</InputAdornment>,
                                }}
                                error={errors.coverageDuration !== undefined}
                                helperText={errors.coverageDuration !== undefined 
                                    ? ( errors.coverageDuration.type == 'pattern' 
                                            ? t(`error.field.numberType`, { "ns": "common"}) 
                                            : t(`error.field.${errors.coverageDuration.type}`, { "ns": "common", "minValue": coverageDaysMin, "maxValue": coverageDaysMax }) 
                                    ) : ""}
                                />}
                        />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="coverageEndDate"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => 
                            <DatePicker
                                {...field} 
                                label={t('coverageDurationUntil')}
                                inputFormat="DD.MM.YYYY"
                                disabled={props.formDisabled}
                                renderInput={(params) => 
                                    <TextField 
                                        {...params}
                                        fullWidth 
                                        variant={INPUT_VARIANT} 
                                        />
                                }
                                disablePast={true}
                                minDate={coverageUntilMin}
                                maxDate={coverageUntilMax}
                                />}
                        />
                </Grid>
                <Grid item xs={12}>
                    <Premium 
                        control={control}
                        disabled={props.formDisabled}
                        premium={premium}
                        premiumCurrency={props.usd2}
                        premiumCurrencyDecimals={props.usd2Decimals}
                        bundleCurrency={props.usd1}
                        bundleCurrencyDecimals={props.usd1Decimals}
                        error={t(premiumErrorKey, { currency: props.usd2 })}
                        transactionInProgress={(props.premiumTrxTextKey != "") || premiumCalculationInProgress}
                        textKey={props.premiumTrxTextKey || 'premium_calculation_in_progress'}
                        bundles={props.bundles}
                        showBundles={showAvailableBundles}
                        />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="termsAndConditions"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => 
                        <FormControlLabel 
                            control={
                                <Checkbox 
                                    defaultChecked={false}
                                    {...field}
                                    />
                            } 
                            disabled={props.formDisabled}
                            label={t('checkbox_t_and_c_label')} />}
                        />
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        variant='contained'
                        type="submit"
                        disabled={!formState.isValid || premiumCalculationInProgress || props.formDisabled}
                        fullWidth
                        // onClick={buy}
                        sx={{ p: 1 }}
                    >
                        <FontAwesomeIcon icon={faShield} className="fa" />
                        {t('button_buy')}
                    </Button>
                    {loadingBar}
                </Grid>
            </Grid>
        </form>

        {/* <DevTool control={control} /> */}
    </>);
}
