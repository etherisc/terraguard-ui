import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { SignerContext } from "../../context/signer_context";
import { useTranslation } from 'next-i18next';
import { InsuranceData } from "../../utils/insurance_data";

export interface ApplicationProps {
    insurance: InsuranceData;
}

const steps = ['step0', 'step1', 'step2', 'step3', 'step4'];

export default function Application(props: ApplicationProps) {
    const { t } = useTranslation('application');
    
    const signerContext = useContext(SignerContext);
    const [activeStep, setActiveStep] = useState(signerContext?.data.signer === undefined ? 0 : 1);

    useEffect(() => {
        console.log("signer changed");
        if (activeStep < 1 && signerContext?.data.signer !== undefined) {
            setActiveStep(1);
        } else if (signerContext?.data.signer === undefined) {
            setActiveStep(0);
        }
        
    }, [signerContext?.data.signer, activeStep]);

    return (
        <>
            <div>
                <Typography variant="h5" mb={2}>{t('title', { currency: props.insurance.usd1 })}</Typography>

                <Stepper activeStep={activeStep}>
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
            </div>
        </>
    );
}