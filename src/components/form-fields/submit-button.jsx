import React from 'react';
import { Button } from '@material-ui/core';
import { useFormikContext } from 'formik';

const SubmitButtonWrapper = ({children, ...otherProps}) => {
    const { submitForm } = useFormikContext();

    const handleSubmit = () => {
        submitForm();
    }

    const configButton = {
        ...otherProps,
        width: 150,
        onClick: handleSubmit
    }


    return (
        <Button {...configButton}>
            {children}
        </Button>
    );
};

export default SubmitButtonWrapper;
