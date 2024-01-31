import { Button, TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import { addCustomPrefType } from '../../../../pages/authorized/PreferencesPage/PreferencesPage';
import styles from './CustomPreferences.module.less';

export const CustomPreferences: FC<{addCustomPref: addCustomPrefType}> = ({ addCustomPref }) => {

    let [preferenceText, setPreferenceText] = useState<string>("");

    const preferenceInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPreferenceText(preference => preference = event.target.value);
    };

    const addButtonHandler = () => {
        addCustomPref(preferenceText);
        setPreferenceText(preferenceText => preferenceText = "");
    };

    return (
        <div className={styles.customPreferences}>
            <TextField
                value={preferenceText}
                onChange={preferenceInputHandler}
                label="Your preference"
                variant="standard"
            />
            <Button
                onClick={addButtonHandler}
                color="primary"
                variant="contained"
            >add
            </Button>
        </div>
    );
};