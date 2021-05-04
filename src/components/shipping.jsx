import React from 'react';
import {Form, Formik} from "formik";
import * as yup from 'yup';
import ButtonWrapper from "./form-fields/button";
import SelectWrapper from "./form-fields/select";
import SubmitButtonWrapper from "./form-fields/submit-button";

const validationSchema = yup.object({
    shippingMethod: yup.string()
});

const ShippingMethods = {
    "England": {
        "By_Air": "By Air",
        "By_Road": "By Road"
    },
    "US": {
        "By_Air": "By Air",
    }
};

const Shipping = ({current, send}) => {
    const initialValues = {
        shippingMethod: ''
    };

    console.log(current.context.address.country);

    const filteredShippingMethods = ShippingMethods[current.context.address.country];
    const onSubmit = (values) => {
        send('select_shipping', values);
    };

    const onSkipShipping = () => {
        send('skip_shipping');
    }
    return (
        <Formik initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
            <Form>
                <SelectWrapper
                    name="shippingMethod"
                    label="Shipping Method"
                    options={filteredShippingMethods}
                />
                <div style={{flexDirection: 'row'}}>
                    <SubmitButtonWrapper color="primary" variant="contained" type="submit" style={{marginTop: 10, marginBottom: 18, marginRight: 20}}>
                        Add Shipping
                    </SubmitButtonWrapper>
                    <ButtonWrapper color="secondary"
                                   variant="contained"
                                   onClick={onSkipShipping}
                                   style={{marginTop: 10, marginBottom: 18}}>
                        Skip Shipping
                    </ButtonWrapper>
                </div>
            </Form>
        </Formik>
    );
}

export default Shipping;
