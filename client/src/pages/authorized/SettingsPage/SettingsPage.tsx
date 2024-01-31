import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, Link as MaterialLink, Switch, TextField, Typography } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { ColumnWrap } from '../../../components/layout/ColumnWrap/ColumnWrap';
import { Header } from '../../../components/layout/Headers/Header/Header';
import { PageHeader } from '../../../components/layout/Headers/PageHeader/PageHeader';
import { Plug } from '../../../components/layout/Plug/Plug';
import { DeleteAccountButton } from '../../../components/logic/DeleteAccountButton';
import { ImageUpload } from '../../../components/logic/ImageUpload/ImageUpload';
import { CustomArrowOutwardIcon } from '../../../components/ui/CustomIcons/CustomIcons';
import { SmallGoldenRatioBox } from '../../../components/ui/customStyledComponents';
import { ChangeInput } from '../../../components/ui/Inputs/ChangeInput/ChangeInput';
import { changeNameAvatarIsOpenedThunk, deleteAccountThunk } from '../../../fullStore/combos/user/userQueries';
import { logOut } from '../../../fullStore/combos/user/userSlice';
import { useAppDispatch } from '../../../fullStore/hooks';
import useCustomDispatch from '../../../hooks/useCustomDispatch';
import useUser from '../../../hooks/useUser';
import { changeInputCallbackType, readyImageCallbackType } from '../../../types/callbacks';
import styles from './SettingsPage.module.less';

export const SettingsPage: FC<{}> = () => {

    const usualDispatch = useAppDispatch();

    const user = useUser();
    let [image, setImage] = useState<HTMLCanvasElement | string>(null);
    let [imageFile, setImageFile] = useState<File>(null);
    let [username, setUsername] = useState<string>("");
    let [isAccountOpened, setIsAccountOpened] = useState<boolean | null>(null);

    let [didUsernameChanged, setDidUsernameChanged] = useState<boolean>(false);
    let [didImageChanged, setDidImageChanged] = useState<boolean>(false);
    let [didIsOpenedUpdated, setDidIsOpenedUpdated] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            if (user.avatar) setImage(prev => prev = user.avatar);
            if (user.name) setUsername(prev => prev = user.name);
            if (user.isOpened) setIsAccountOpened(prev => prev = user.isOpened);
        };
    }, [user]);

    const readyImageCallback: readyImageCallbackType = (canvas, imageFile) => {
        setImage(prev => prev = canvas);
        setImageFile(prev => prev = imageFile);
        setDidImageChanged(true);
    };

    const usernameCallback: changeInputCallbackType = (text: string) => {
        setUsername(prev => prev = text);
        setDidUsernameChanged(true);
    };

    const isAccauntOpenedCallback = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setIsAccountOpened(prev => prev = checked);
        setDidIsOpenedUpdated(true);
    };

    const navigate = useNavigate();

    const thunkDispatch = useCustomDispatch();

    const applyChanges = () => {
        const formData = new FormData();
        if (didUsernameChanged) formData.append("name", username);
        if (didImageChanged) formData.append("avatar", imageFile);
        if (didIsOpenedUpdated) formData.append("isOpened", `${isAccountOpened}`);

        const resolveCallback = () => navigate("/");

        thunkDispatch(
            changeNameAvatarIsOpenedThunk(
                formData
            ),
            resolveCallback
        );
    };

    const logoutHandler = () => {
        localStorage.removeItem("token");
        usualDispatch(logOut());
    };

return (
    <ColumnWrap>
        {
            user &&
            <>
                <PageHeader
                    isShowing={false}
                >
                    <Header text="Settings" />
                    <Plug />
                </PageHeader>
                <div className={styles.settingsPage}>
                    <MaterialLink
                        to="/blocked"
                        variant="body2"
                        component={RouterLink}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textDecoration: "none",
                            color: "#000"
                        }}
                    >
                        blocked users
                        <CustomArrowOutwardIcon />
                    </MaterialLink>
                    <SmallGoldenRatioBox
                        sx={{
                            alignItems: "center"
                        }}
                    >
                        <ImageUpload
                            readyImageCallback={readyImageCallback}
                            src={image as string || null}
                        />
                        <ChangeInput
                            sx={{ margin: "20px 0" }}
                            text={username}
                            changeInputCallback={usernameCallback}
                        />
                        <FormGroup>
                            <FormControlLabel control={
                                <Switch
                                    checked={isAccountOpened}
                                    onChange={isAccauntOpenedCallback}
                                />
                            }
                                label={`my account is ${isAccountOpened ? "public" : "private"}`}
                            />
                        </FormGroup>
                        <Button
                            onClick={applyChanges}
                            variant="contained"
                            sx={{
                                marginTop: "20px"
                            }}
                        >Apply
                        </Button>
                    </SmallGoldenRatioBox>
                    <Button
                        sx={{
                            marginTop: "50px"
                        }}
                        onClick={logoutHandler}
                    >
                        Log out
                    </Button>
                    <DeleteAccountButton/>
                </div>
            </>
        }
    </ColumnWrap>
);
};