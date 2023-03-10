import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

//Better approach than "beforeEach"
const renderComponent = () => {
  const mockData = [
    { name: "John Doe", email: "john@john.com" },
    { name: "Jane Doe", email: "jane@jane.com" },
  ];

  render(<UserList users={mockData} />);

  return {
    mockData,
  };
};

test("Renders one row per user", () => {
  renderComponent();
  // screen.logTestingPlaygroundURL(); For debugging in browser

  // First way
  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  // Second way
  //   const { container } = render(<UserList users={mockData} />);
  //   const rows = container.querySelectorAll("tbody tr");

  //Assertion
  expect(rows).toHaveLength(2);
});

test("Renders user with 'name' and 'email'", () => {
  const { mockData } = renderComponent();

  for (let user of mockData) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
