import { Box } from "@mui/material";
import React, { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  compareCodeThunk,
  useCheckingEmail,
} from "../../../fullStore/combos/user/userQueries";
import {
  setErrorMessage,
  setIsLoading,
} from "../../../fullStore/combos/user/userSlice";
import { useAppDispatch } from "../../../fullStore/hooks";
import useCustomDispatch from "../../../hooks/useCustomDispatch";
import { setIsEmailVerifiedCallbackType } from "../../../types/callbacks";
import { Header } from "../../layout/Headers/Header/Header";
import { PageHeader } from "../../layout/Headers/PageHeader/PageHeader";
import { Plug } from "../../layout/Plug/Plug";
import { AddInput } from "../../ui/Inputs/AddInput/AddInput";
import {
  CustomStack,
  SmallGoldenRatioBox,
} from "../../ui/customStyledComponents";
import styles from "./EmailVerifyingStyle";

export const EmailVerifying: FC<EmailVerifyingPropsType> = ({
  setIsEmailVerifiedCallback,
  removeBackArrow,
  t,
}) => {
  let [hasEmailBeenSent, setHasEmailBeenSent] = useState<boolean>(false);
  let [email, setEmail] = useState<string>("");
  const process =
    useLocation().pathname.slice(1) === "signUp"
      ? "sign up"
      : "forgot password";

  const [sendEmail] = useCheckingEmail();
  const usualDispatch = useAppDispatch();
  const thunkDispatch = useCustomDispatch();

  const sendButtonHandler = (text: string) => {
    setEmail((prev) => (prev = text));
    usualDispatch(setIsLoading(true));
    sendEmail({
      email: text,
      process,
    })
      .unwrap()
      .then((fulfilled: { message: string }) => {
        alert(fulfilled.message);
        setHasEmailBeenSent(true);
      })
      .catch((e: any) => usualDispatch(setErrorMessage(e.data.message)));
    usualDispatch(setIsLoading(false));
  };

  const verifyButtonHandler = (text: string) => {
    const resolveCallback = () => setIsEmailVerifiedCallback(true);
    thunkDispatch(compareCodeThunk({ email, code: text }), resolveCallback);
  };

  return (
    <Box sx={styles.container}>
      {removeBackArrow ? (
        <Box sx={styles.header}>
          <Header sx={styles.center} text={t("emailValheader")} />
        </Box>
      ) : (
        <PageHeader isShowing={false}>
          <Header sx={styles.center} text={t("emailValheader")} />
          <Plug />
        </PageHeader>
      )}
      <SmallGoldenRatioBox sx={styles.center}>
        <CustomStack sx={styles.stack}>
          <AddInput
            text=""
            buttonText={t("sendButtonText")}
            label={t("emailLabel")}
            addInputCallback={sendButtonHandler}
            inputTestId="email-input"
            buttonTestId="send-button"
          />
          {hasEmailBeenSent ? (
            <AddInput
              sx={styles.verifyInput}
              text=""
              buttonText={t("addInput_verify")}
              label={t("verificationCode")}
              addInputCallback={verifyButtonHandler}
              inputTestId="verification-code-input"
              buttonTestId="verify-button"
            />
          ) : (
            ""
          )}
        </CustomStack>
      </SmallGoldenRatioBox>
    </Box>
  );
};

type EmailVerifyingPropsType = {
  setIsEmailVerifiedCallback: setIsEmailVerifiedCallbackType;
  removeBackArrow?: true;
  t: any;
};
