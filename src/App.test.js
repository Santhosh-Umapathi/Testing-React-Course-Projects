import { render, screen } from "@testing-library/react";
import App from "./App";
import user from "@testing-library/user-event";

test("Can receive new user and show it on the list", () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const submitButton = screen.getByRole("button", { name: /add user/i });

  user.click(nameInput);
  user.type(nameInput, "John Doe");
  user.click(emailInput);
  user.type(emailInput, "John@john.com");
  user.click(submitButton);

  const name = screen.getByRole("cell", { name: "John Doe" });
  const email = screen.getByRole("cell", { name: "John@john.com" });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
