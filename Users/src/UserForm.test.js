import { render, screen } from "@testing-library/react";
import UserForm from "./UserForm";
import user from "@testing-library/user-event";

test("Renders two inputs and a button", () => {
  //1. Render the component
  render(<UserForm />);
  //2. Manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");
  //3. Assertion - make sure the component is doing what you expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("It renders inputs with 'onUserAdd' and submit form", () => {
  const mock = jest.fn();
  const mockData = {
    name: "John Doe",
    email: "johnDoe@gmail.com",
  };
  render(<UserForm onUserAdd={mock} />);

  // Find inputs - 2 inputs
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  // Simulate user input
  user.click(nameInput);
  user.keyboard(mockData.name);

  user.click(emailInput);
  user.keyboard(mockData.email);

  const button = screen.getByRole("button");
  user.click(button);

  // Assertion
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({
    name: mockData.name,
    email: mockData.email,
  });
});

test("It empties user inputs after submit", () => {
  render(<UserForm onUserAdd={() => {}} />);

  // Find inputs - 2 inputs
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  const button = screen.getByRole("button");

  // Simulate user input
  user.click(nameInput);
  user.keyboard("John Doe");
  user.click(emailInput);
  user.keyboard("John@john.com");
  user.click(button);

  // Assertion
  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
