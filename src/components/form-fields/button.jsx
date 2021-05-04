import React from 'react';
import { Button } from '@material-ui/core';

const ButtonWrapper = ({children, ...otherProps}) => {
    const configButton = {
        ...otherProps,
        width: 150
    }

    return (
        <Button {...configButton}>
            {children}
        </Button>
    );
};

export default ButtonWrapper;
