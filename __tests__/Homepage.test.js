import { render, screen } from "@testing-library/react";
import Homepage from "../pages/Homepage";

// eslint-disable-next-line no-undef
test("Should have the word Tracks in the component", () => {
  render(<Homepage />);
  const myElement = screen.getByText("Tracks");
  //eslint-disable-next-line no-undef
  expect(myElement).toBeInTheDocument();
});
