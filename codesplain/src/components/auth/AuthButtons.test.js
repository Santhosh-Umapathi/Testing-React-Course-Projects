import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthButtons from "./AuthButtons";
import { createServer } from "../../test/server";
import { SWRConfig } from "swr";

const renderComponent = async () => {
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );

  await screen.findAllByRole("link");
};

describe("when user is not logged in", () => {
  createServer([
    {
      method: "get",
      url: "/api/user",
      response: (req, res, ctx) => {
        return {
          user: null,
        };
      },
    },
  ]);
  test("renders sign in and sign up buttons", async () => {
    // debugger; //to debug this test on chrome inspect with test:debug script
    await renderComponent();

    const signInButton = screen.getByRole("link", { name: /sign in/i });
    const signUpButton = screen.getByRole("link", { name: /sign up/i });

    expect(signInButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute("href", "/signin");
    expect(signUpButton).toHaveAttribute("href", "/signup");
  });
  test("does not render sign out button", async () => {
    await renderComponent();
    const signOutButton = screen.queryByRole("link", { name: /sign out/i });
    expect(signOutButton).not.toBeInTheDocument();
  });
});

describe("when user is logged in", () => {
  createServer([
    {
      method: "get",
      url: "/api/user",
      response: (req, res, ctx) => {
        return {
          user: { id: 1, email: "test@test.com" },
        };
      },
    },
  ]);

  test("renders sign out button", async () => {
    await renderComponent();
    const signOutButton = screen.queryByRole("link", { name: /sign out/i });
    expect(signOutButton).toBeInTheDocument();
    expect(signOutButton).toHaveAttribute("href", "/signout");
  });

  test("does not render sign in and sign up buttons", async () => {
    // debugger;
    await renderComponent();

    const signInButton = screen.queryByRole("link", { name: /sign in/i });
    const signUpButton = screen.queryByRole("link", { name: /sign up/i });

    expect(signInButton).not.toBeInTheDocument();
    expect(signUpButton).not.toBeInTheDocument();
  });
});
