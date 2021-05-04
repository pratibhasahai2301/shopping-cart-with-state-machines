import React from 'react';
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel, withStyles
} from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import {green} from "@material-ui/core/colors";

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CheckboxWrapper = ({name, label, legend}) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = evt => {
        const { checked } = evt.target;
        setFieldValue(name, checked);
    };

    const configCheckbox = {
        ...field,
        onChange: handleChange
    };

    const configFormControl = {};
    if (meta && meta.touched && meta.error) {
        configFormControl.error = true;
    }

    return (
        <div style={{marginBottom: 18, display: "flex", justifyContent: "flex-start"}}>
            <FormControl {...configFormControl}>
                <FormLabel component="legend">{legend}</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<GreenCheckbox {...configCheckbox} />}
                        label={label}
                    />
                </FormGroup>
            </FormControl>
        </div>
    );
};

export default CheckboxWrapper;
