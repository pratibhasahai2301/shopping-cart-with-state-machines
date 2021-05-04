import React from 'react';
import {Form, Formik} from "formik";
import * as yup from 'yup';
import TextFieldWrapper from "./form-fields/text-field";
import SelectWrapper from "./form-fields/select";
import SubmitButtonWrapper from "./form-fields/submit-button";

const validationSchema = yup.object({
    street: yup
        .string('Enter name of the product')
        .required('Street is required'),
    city: yup
        .string('Enter price of the product')
        .required('City is required'),
    country: yup.string()
});

const countries = {
    "England": "England",
    "US": "US"
};

const Address = ({current, send}) => {
    const initialValues = {
        street: '',
        city: '',
        country: 'England'
    };

    const onSubmit = (values) => {
        console.log('going to save the address', values);
        console.log(current.value);
        send('address', {data: values});
    };

    return (
        <Formik initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
            <Form>
                <TextFieldWrapper
                    name="street"
                    label="Street"
                />
                <TextFieldWrapper name="city" label="City" />
                <SelectWrapper
                    name="country"
                    label="Country"
                    options={countries}
                />
                <SubmitButtonWrapper color="primary" variant="contained" type="submit" style={{marginTop: 10, marginBottom: 18}}>
                    Add Address
                </SubmitButtonWrapper>
            </Form>
        </Formik>
    );
}

export default Address;
