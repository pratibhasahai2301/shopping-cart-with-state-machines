import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

const TextfieldWrapper = ({name, ...otherProps}) => {
    const [field, mata] = useField(name);

    const configTextField = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined'
    };

    if (mata && mata.touched && mata.error) {
        configTextField.error = true;
        configTextField.helperText = mata.error;
    }

    return (
        <div style={{marginBottom: 18}}>
            <TextField {...configTextField} />
        </div>
    );
};

export default TextfieldWrapper;
