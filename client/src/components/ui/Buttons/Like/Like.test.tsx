import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Like from "./Like";
import { BrowserRouter } from "react-router-dom";

test("renders like component with provided props", () => {
  const props = {
    isLiked: false,
    like: jest.fn(),
    unLike: jest.fn(),
    numberOfLikes: "10",
    imageId: 5,
  };

  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <Like {...props} />
    </BrowserRouter>,
  );

  expect(getByText("10")).toBeInTheDocument();

  const likeButton = getByTestId("like");
  fireEvent.click(likeButton);
  expect(props.like).toHaveBeenCalledTimes(1);
});

test("renders unlike component with provided props", () => {
  const props = {
    isLiked: true,
    like: jest.fn(),
    unLike: jest.fn(),
    numberOfLikes: "10",
    imageId: 5,
  };

  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <Like {...props} />
    </BrowserRouter>,
  );

  expect(getByText("10")).toBeInTheDocument();

  const unLikeButton = getByTestId("unLike");
  fireEvent.click(unLikeButton);
  expect(props.unLike).toHaveBeenCalledTimes(1);
});
