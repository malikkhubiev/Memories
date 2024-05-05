import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  useTheme,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccountThunk } from "../../../fullStore/combos/user/userQueries";
import useCustomDispatch from "../../../hooks/useCustomDispatch";
import { useTranslation } from "react-i18next";
import { addDynamicResources } from "../../../i18n/i18n";
import styles from './DeleteAccountButtonStyle'

export const DeleteAccountButton: FC<{}> = () => {
  const [open, setOpen] = useState<boolean>(false);
  let [password, setPassword] = useState<string>("");

  const theme = useTheme();

  const { t } = useTranslation("authorized");
  useEffect(() => {
    addDynamicResources("authorized");
  }, []);

  const navigate = useNavigate();

  const passwordChangeHandler = (event: any) => {
    setPassword((prev) => (prev = event.target.value));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const thunkDispatch = useCustomDispatch();

  const deleteAccauntHandler = () => {
    thunkDispatch(deleteAccountThunk(password), () => navigate(0));
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("delete_title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("delete_confirmation")}</DialogContentText>
          <TextField
            autoFocus
            value={password}
            onChange={passwordChangeHandler}
            id="password"
            label={t("delete_password_label")}
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("delete_cancel_button")}</Button>
          <Button onClick={deleteAccauntHandler}>
            {t("delete_delete_button")}
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        color="error"
        sx={styles.button(theme)}
      >
        {t("delete_confirm_button")}
      </Button>
    </>
  );
};
