import React from 'react';
import {Form, Formik} from "formik";
import * as yup from 'yup';
import ButtonWrapper from "./form-fields/button";
import SelectWrapper from "./form-fields/select";
import SubmitButtonWrapper from "./form-fields/submit-button";

const validationSchema = yup.object({
    paymentMetod: yup.string()
});

const PaymentMethods = {
    "Visa": "VISA",
    "Paypal": "Paypal",
    "COD": "Cash On Delivery"
};

const PaymentMethod = ({send}) => {
    const initialValues = {
        paymentMethod: ''
    };

    const onSubmit = (values) => {
        send('select_payment', values);
    };

    const onSkipPayment = () => {
        send('skip_payment');
    }

    return (
        <Formik initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
            <Form>
                <SelectWrapper
                    name="paymentMethod"
                    label="Payment Method"
                    options={PaymentMethods}
                />
                <SubmitButtonWrapper color="primary" variant="contained" type="submit"
                                     style={{marginTop: 10, marginBottom: 18, marginRight: 20}}>
                    Add Payment
                </SubmitButtonWrapper>
                <ButtonWrapper color="secondary"
                               variant="contained"
                               onClick={onSkipPayment}
                               style={{marginTop: 10, marginBottom: 18}}>
                    Skip Payment
                </ButtonWrapper>
            </Form>
        </Formik>
    );
}

export default PaymentMethod;
