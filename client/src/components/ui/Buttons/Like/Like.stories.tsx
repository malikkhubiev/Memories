import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Like, { LikePropsType } from "./Like";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Components/Like",
  component: Like,
  argTypes: {
    isLiked: { control: "boolean" },
    numberOfLikes: { control: "text" },
  },
} as Meta;

const Template: StoryFn<LikePropsType> = (args) => (
  <BrowserRouter>
    <Like {...args} />
  </BrowserRouter>
);

export const Liked = Template.bind({});
Liked.args = {
  imageId: 1,
  isLiked: true,
  numberOfLikes: "10",
  like: () => console.log("Liked"),
  unLike: () => console.log("Unliked"),
};

export const NotLiked = Template.bind({});
NotLiked.args = {
  imageId: 1,
  isLiked: false,
  numberOfLikes: "5",
  like: () => console.log("Liked"),
  unLike: () => console.log("Unliked"),
};
