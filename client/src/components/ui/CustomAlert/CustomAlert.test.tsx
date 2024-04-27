import React from "react";
import { render, screen } from "@testing-library/react";
import { CustomAlert } from "./CustomAlert";

describe("CustomAlert", () => {
  it("должен рендерить сообщение и устанавливать правильный стиль", () => {
    const message = "Тестовое сообщение";
    render(<CustomAlert message={message} />);
    // Проверка наличия текста сообщения
    // @ts-ignore
    expect(screen.getByText(message)).toBeInTheDocument();

    // Проверка установленного стиля
    const alertElement = screen.getByRole("alert");
    // @ts-ignore
    expect(alertElement).toHaveStyle("position: absolute"); // Проверьте, что у вас правильные стили здесь
  });
});
