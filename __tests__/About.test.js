import { render, screen } from "@testing-library/react";
import About from "../pages/About";

// eslint-disable-next-line no-undef
test("Should have the word MEEM in the component", () => {
  render(<About />);
  const myElement = screen.getByText("MEEM");
  //eslint-disable-next-line no-undef
  expect(myElement).toBeInTheDocument();
});
