import React from 'react';

import {useMachine} from "@xstate/react";

import {Paper, Step, StepConnector, StepLabel, Stepper, Typography} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';

import ShoppingCart from "./shopping-cart";
import Address from "./address";
import Shipping from "./shipping";
import PaymentMethod from "./payment";
import Summary from "./summary";
import ColorlibStepIcon from "./stepper/color-lib-step-icon";
import {cartMachine} from "../machines/state-machine";

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

function getSteps() {
    return ['Add Product(s)', 'Add Address', 'Add Shipping', 'Add Payment', 'Finish'];
}

const Home = () => {
    const [current, send] = useMachine(cartMachine);
    const steps = getSteps();

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <ShoppingCart send={send} current={current} />;
            case 1:
                return <Address current={current} send={send} />;
            case 2:
                return <Shipping current={current} send={send} />;
            case 3:
                return <PaymentMethod send={send} />;
            case 4:
                return <Summary current={current} send={send} />
            default:
                return <Typography>Unknown Steps</Typography>;
        }
    }

    const getActiveStep = () => {
        switch (current.value) {
            case 'idle':
                return 0;
            case 'cart':
                return 1;
            case 'addressed':
                return 2;
            case 'shipping_selected':
            case 'shipping_skipped':
                return 3;
            case 'payment_skipped':
            case 'payment_selected':
            case 'completed':
            case 'resolved':
            case 'rejected':
                return 4;
            default:
                return 0;
        }
    }

    return (
        <div className="container">
            <Stepper alternativeLabel activeStep={getActiveStep()} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                <Paper elevation={2} style={{padding: 24}}>
                    {
                        getStepContent(getActiveStep())
                    }
                </Paper>
            </div>
        </div>
    );
};

export default Home;
