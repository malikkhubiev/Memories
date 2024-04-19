import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccountThunk } from "../../fullStore/combos/user/userQueries";
import useCustomDispatch from "../../hooks/useCustomDispatch";

export const DeleteAccountButton: FC<{}> = () => {
  const [open, setOpen] = useState<boolean>(false);
  let [password, setPassword] = useState<string>("");

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
        <DialogTitle>Account deleting</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your password to confirm that you are the account owner
          </DialogContentText>
          <TextField
            autoFocus
            value={password}
            onChange={passwordChangeHandler}
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteAccauntHandler}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Button
        onClick={handleClickOpen}
        color="error"
        sx={{
          marginTop: "50px",
        }}
      >
        Delete account
      </Button>
    </>
  );
};
