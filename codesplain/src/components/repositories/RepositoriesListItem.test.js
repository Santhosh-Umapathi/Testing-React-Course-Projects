import { act, render, screen } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";

// STEP:2 - Module Mocking - Mocking the FileIcon component
// jest.mock("../tree/FileIcon", () => {
//   return () => "File Icon Component";
// });

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

test("link to show github homepage", async () => {
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  // screen.debug();
  // await pause(500);
  // screen.debug();

  // STEP:1 - Resolves ACT warning, 90% use findBy when ever there is useEffect and a promise on the component
  await screen.findByRole("img", { name: repository.language });

  // STEP:2 - Module Mocking using jest.mock

  // STEP:3 - ACT with pause (Not recommended, only last resort)
  // await act(async () => {
  //   await pause(1000);
  // });

  const link = screen.getByRole("link", {
    name: /github repository/i,
  });
  expect(link).toHaveAttribute("href", repository.html_url);
});

test("shows icon correctly based on language", async () => {
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  const icon = await screen.findByRole("img", { name: repository.language });

  expect(icon).toHaveClass("js-icon");
});

test("shows link correctly to src code", async () => {
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  await screen.findByRole("img", { name: repository.language });

  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login, "i"),
  });

  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});

// Helper function to wait for promise to resolve
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
