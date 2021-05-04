import React from 'react';
import uuid from 'react-uuid';
import {Form, Formik} from "formik";
import * as yup from 'yup';
import TextFieldWrapper from "./form-fields/text-field";
import ButtonWrapper from "./form-fields/button";
import SubmitButtonWrapper from "./form-fields/submit-button";
import CheckboxWrapper from "./form-fields/checkbox";

const validationSchema = yup.object({
    id: yup.string(),
    name: yup
        .string('Enter name of the product')
        .required('Product Name is required'),
    price: yup
        .string('Enter price of the product')
        .required('Product Price is required'),
    requiresShipping: yup.boolean()
});

const ProductAdd = ({send}) => {
    const initialValues = {
        id: '',
        name: '',
        price: '0',
        requiresShipping: false
    }

    const onSubmit = (values) => {
        values.id = uuid();
        send('productAdded', {data: values});
    };

    const handleReset = (resetForm) => {
        resetForm();
    }

    return (
        <Formik initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>
            {formProps => {
                return (
                    <Form>
                        <TextFieldWrapper
                            name="name"
                            label="Product Name"
                        />
                        <TextFieldWrapper name="price"
                                          type="number"
                                          InputProps={{inputProps: {min: 0}}}
                                          label="Product Price" />
                        <CheckboxWrapper label={'Requires Shipping'}
                                         name="requiresShipping" />
                        <SubmitButtonWrapper color="primary" variant="contained" type="submit"
                                             data-testid="add-product-button"
                                             style={{marginTop: 10, marginBottom: 18, marginRight: 12}}>
                            Add Product
                        </SubmitButtonWrapper>
                        <ButtonWrapper color="secondary"
                                       variant="contained"
                                       data-testid="reset-product-button"
                                       onClick={() => handleReset(formProps.resetForm)}
                                       style={{marginTop: 10, marginBottom: 18}}>
                            Reset
                        </ButtonWrapper>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default ProductAdd;
