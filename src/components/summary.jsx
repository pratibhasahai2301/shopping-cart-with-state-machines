import React from 'react';
import CartTable from "./cart-table";
import ButtonWrapper from "./form-fields/button";
import {Typography} from "@material-ui/core";

const Summary = ({current, send}) => {
    const {cart, address, shippingMethod, paymentMethod} = current.context;

    const handleConfirm = () => {
        send('complete');
    }

    const summaryData = () => {
        return (
            <>
                <CartTable data={cart} showDelete={false} />

                <div className="row my-3">
                    <div className="col-3 justify-content-start d-flex">
                        <Typography variant={'button'}>Address</Typography>
                    </div>
                    <div className="col-9 justify-content-start d-flex">
                        {
                            `${address.street}, ${address.city}, ${address.country}`
                        }
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-3 justify-content-start d-flex">
                        <Typography variant={'button'}>Shipping Method</Typography>
                    </div>
                    <div className="col-9 justify-content-start d-flex">
                        {
                            shippingMethod || 'Skipped'
                        }
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-3 justify-content-start d-flex font-weight-bold">
                        <Typography variant={'button'}>Payment Method</Typography>
                    </div>
                    <div className="col-9 justify-content-start d-flex">
                        {
                            paymentMethod || 'Skipped'
                        }
                    </div>
                </div>

                <ButtonWrapper color={"primary"}
                               onClick={handleConfirm}
                               variant="contained">
                    Confirm
                </ButtonWrapper>
            </>
        );
    }

    const handleReset = () => {
        console.log(current.value);
        send('reset');
    }

    return (
        <div style={{justifyContent: 'column'}}>
            {
                current.matches('resolved') ?
                    (
                        <>
                            <Typography variant={'h6'}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <ButtonWrapper color={'primary'}
                                           variant="contained"
                                           style={{marginTop: 32}}
                                           onClick={handleReset}>
                                Shop more...
                            </ButtonWrapper>
                        </>
                    ): summaryData()
            }
        </div>
    )
}

export default Summary;
