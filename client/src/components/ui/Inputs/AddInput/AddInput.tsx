import { Box, Button, TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { addInputCallbackType } from '../../../../types/callbacks';
import styles from './AddInput.moudle.less';

export const AddInput: FC<AddInputPropsType> = (
    { text, placeholder, addInputCallback, isMultiline, label, sx, lines }) => {

    let [value, setValue] = useState<string>(text);

    useEffect(() => {
        setValue(prev => prev = text);
    }, [text]);

    const textHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(prev => prev = event.target.value);
    };

    const buttonHandler = () => {
        addInputCallback(value);
    };

    let boxSx = {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };
    if (sx) boxSx = { ...boxSx, ...sx };

    return (
        <Box
            sx={boxSx}
        >
            <TextField
                sx={{
                    margin: "0",
                    width: {
                        xs: "70%",
                        md: "80%"
                    },
                }}
                multiline={isMultiline}
                maxRows={lines || null}
                label={label}
                autoComplete="off"
                placeholder={placeholder ? placeholder : null}
                value={value}
                onChange={textHandler}
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                        buttonHandler();
                        ev.preventDefault();
                    };
                }}
            />
            <Button
                sx={{
                    width: {
                        xs: "30%",
                        md: "20%",
                    },
                    height: "100%"
                }}
                onClick={buttonHandler}
                variant="contained"
            >Send</Button>
        </Box>
    );
};

type AddInputPropsType = {
    placeholder?: string
    label?: string
    text?: string
    sx?: any
    buttonText: string
    addInputCallback: addInputCallbackType
    isMultiline?: true
    lines?: number
};