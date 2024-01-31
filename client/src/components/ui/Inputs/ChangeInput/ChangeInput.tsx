import { Box, Button, Input, TextareaAutosize, TextField, Typography } from '@mui/material';
import React, { ChangeEventHandler, FC, useState } from 'react';
import { changeInputCallbackType } from '../../../../types/callbacks';
import { CustomEditIcon } from '../../CustomIcons/CustomIcons';
import styles from './ChangeInput.module.less';

export const ChangeInput: FC<ChangeInputPropsType> = (
    { text, changeInputCallback, placeholder, sx, isMultiline }) => {

    let [value, setValue] = useState<string>(text);
    let [isChangingMode, setIsChangingMode] = useState<boolean>(false);

    const inputHandler = (event: any) => {
        setValue(prev => prev = event.target.value);
    };

    const openChangingMode = () => {
        setIsChangingMode(prev => prev = true);
    };

    const saveHandler = () => {
        setIsChangingMode(prev => prev = false);
        changeInputCallback(value);
    };

    return (
        <Box
            sx={sx || null}
        >
            {
                isChangingMode ?
                    <div className={styles.group}>
                        <TextField
                            multiline={isMultiline}
                            maxRows={isMultiline ? 10 : null}
                            placeholder={placeholder || null}
                            onChange={inputHandler}
                            value={value}
                            onKeyPress={(ev) => {
                                if (ev.key === 'Enter') {
                                    saveHandler();
                                    ev.preventDefault();
                                };
                            }}
                        />
                        <Button
                            onClick={saveHandler}
                            variant="contained"
                        >Save</Button>
                    </div> :
                    <div className={styles.group}>
                        <Typography
                            variant="body2"
                            sx={{
                                width: "100%",
                                wordBreak: "break-all",
                            }}
                        >{text || placeholder}</Typography>
                        <div onClick={openChangingMode}>
                            <CustomEditIcon />
                        </div>
                    </div>
            }

        </Box>
    )
};

type ChangeInputPropsType = {
    text?: string
    changeInputCallback: changeInputCallbackType
    placeholder?: string
    sx?: any
    isMultiline?: true
};