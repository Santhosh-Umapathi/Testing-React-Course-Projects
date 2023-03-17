import { render, screen } from "@testing-library/react";
import HomeRoute from "./HomeRoute";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router";
import { createServer } from "../test/server";

//To Mock api calls and intercept actual api calls and send mock data using MSW
createServer([
  {
    // method: "get", //default is get
    url: "/api/repositories",
    response: (req, res, ctx) => {
      const language = req.url.searchParams.get("q").split("language:")[1];
      // console.log("🚀 --- rest.get --- query:", query);
      return {
        items: [
          {
            id: 1,
            full_name: language + "-repo1",
          },
          {
            id: 2,
            full_name: language + "-repo2",
          },
        ],
      };
    },
  },
]);

test("renders 2 links for each language", async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  //   await pause(1000);
  //   screen.debug();

  const languages = [
    "javascript",
    "typescript",
    "rust",
    "go",
    "python",
    "java",
  ];

  for (const language of languages) {
    const links = await screen.findAllByRole("link", {
      name: new RegExp(`${language}-`, "i"),
    });

    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(`${language}-repo1`);
    expect(links[1]).toHaveTextContent(`${language}-repo2`);
    expect(links[0]).toHaveAttribute("href", `/repositories/${language}-repo1`);
    expect(links[1]).toHaveAttribute("href", `/repositories/${language}-repo2`);
  }
});

//Helper function to delay api call
const pause = (ms) => new Promise((res) => setTimeout(res, ms));
