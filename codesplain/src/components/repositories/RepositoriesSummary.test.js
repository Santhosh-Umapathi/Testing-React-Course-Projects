import { render, screen } from "@testing-library/react";
import RepositoriesSummary from "./RepositoriesSummary";

test("renders the language of the repository", () => {
  const repository = {
    stargazers_count: 1,
    open_issues: 2,
    forks: 3,
    language: "JavaScript",
  };

  render(<RepositoriesSummary repository={repository} />);

  for (let key in repository) {
    const value = screen.getByText(new RegExp(repository[key]));
    expect(value).toBeInTheDocument();
  }
});
