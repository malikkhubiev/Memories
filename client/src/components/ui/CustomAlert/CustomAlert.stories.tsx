import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Alert } from "@mui/material";
import { CustomAlert, Props } from "./CustomAlert";

export default {
  title: "UI/CustomAlert",
  component: CustomAlert,
} as Meta;

const Template: StoryFn<Props> = (args) => <CustomAlert {...args} />;

export const ErrorAlert = Template.bind({});
ErrorAlert.args = {
  message: "This is an error message",
};

export const EmpyErrorAlert = Template.bind({});
EmpyErrorAlert.args = {
  message: "",
};
