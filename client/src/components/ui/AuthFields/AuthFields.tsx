import {
  Button,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FC } from "react";
import styles from "./AuthFieldsStyle";

export const CustomNameField: FC<any> = ({ formik, label, sx }) => {
  return (
    <TextField
      sx={sx || {}}
      fullWidth
      id="name"
      name="name"
      label={label}
      variant="standard"
      value={formik.values.name}
      onChange={formik.handleChange}
      error={formik.touched.name && Boolean(formik.errors.name)}
      helperText={formik.touched.name && formik.errors.name}
    />
  );
};

export const CustomEmailField: FC<any> = ({ formik, sx, label }) => {
  return (
    <TextField
      sx={sx || {}}
      fullWidth
      id="email"
      name="email"
      label={label}
      variant="standard"
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
      variant="standard"
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
    />
  );
};

export const CustomCheckboxField: FC<any> = ({ formik, name, label }) => {
  const theme = useTheme();
  // @ts-ignore
  const color = theme.palette.primary.violet;
  const css = `
    #signInCheckbox:checked {
      background-color: ${color};
    } 
  `;
  return (
    <>
      <style>{css}</style>
      <InputLabel sx={styles.inputLabel}>
        <input
          style={styles.checkbox}
          onChange={formik.handleChange}
          checked={formik.values.rememberMe}
          type="checkbox"
          name={name}
          id="signInCheckbox"
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
    </>
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
