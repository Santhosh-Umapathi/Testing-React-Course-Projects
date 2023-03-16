import { render, screen } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";

test("link to show github homepage", () => {
  const repository = {
    full_name: "jack sparrow",
    language: "Javascript",
    description: "Javascript is the best language ever",
    owner: {
      login: "jack",
    },
    name: "jack sparrow",
    html_url: "https://github.com",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
  //   const linkElement = screen.getByText(/link/i);
  //   expect(linkElement).toBeInTheDocument();
});
