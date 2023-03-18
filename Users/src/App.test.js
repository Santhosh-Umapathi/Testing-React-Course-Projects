import { render, screen } from "@testing-library/react";
import App from "./App";
import user from "@testing-library/user-event";

test("Can receive new user and show it on the list", async () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const submitButton = screen.getByRole("button", { name: /add user/i });

  await user.click(nameInput);
  await user.type(nameInput, "John Doe");
  await user.click(emailInput);
  await user.type(emailInput, "John@john.com");
  await user.click(submitButton);

  const name = screen.getByRole("cell", { name: "John Doe" });
  const email = screen.getByRole("cell", { name: "John@john.com" });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
