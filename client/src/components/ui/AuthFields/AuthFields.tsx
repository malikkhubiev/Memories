import { Button, InputLabel, TextField, Typography } from "@mui/material";
import React, { FC } from "react";
import styles from "./AuthFields.module.less";

export const CustomNameField: FC<any> = ({ formik, sx }) => {
  return (
    <TextField
      sx={sx || {}}
      fullWidth
      id="name"
      name="name"
      label="Name"
      variant="outlined"
      value={formik.values.name}
      onChange={formik.handleChange}
      error={formik.touched.name && Boolean(formik.errors.name)}
      helperText={formik.touched.name && formik.errors.name}
    />
  );
};

export const CustomEmailField: FC<any> = ({ formik, sx }) => {
  return (
    <TextField
      sx={sx || {}}
      className={styles.verticalMargin}
      fullWidth
      id="email"
      name="email"
      label="Email"
      variant="outlined"
      value={formik.values.email}
      onChange={formik.handleChange}
      error={formik.touched.email && Boolean(formik.errors.email)}
      helperText={formik.touched.email && formik.errors.email}
    />
  );
};

export const CustomPasswordField: FC<any> = ({ formik, name, label, sx }) => {
  return (
    <TextField
      sx={sx || {}}
      fullWidth
      id={name}
      name={name}
      label={label}
      type="password"
      variant="outlined"
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
    />
  );
};

export const CustomCheckboxField: FC<any> = ({ formik, name, label }) => {
  return (
    <InputLabel
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        width: "100%",
      }}
    >
      <input
        className={styles.checkbox}
        onChange={formik.handleChange}
        checked={formik.values.rememberMe}
        type="checkbox"
        name={name}
      />
      <Typography
        sx={{
          marginLeft: "10px",
        }}
        variant="body2"
      >
        {label}
      </Typography>
    </InputLabel>
  );
};

export const CustomButton: FC<{ text: string; sx?: any }> = ({ text, sx }) => {
  return (
    <Button
      color="primary"
      variant="contained"
      fullWidth
      type="submit"
      sx={sx || {}}
    >
      {text}
    </Button>
  );
};
