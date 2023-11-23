import { render, screen } from "@testing-library/react";
import Homepage from "../pages/Homepage";

// eslint-disable-next-line no-undef
test('Should have the word "Next.js" in the component', () => {
  render(<Homepage />);
  const myElement = screen.getByText("Homepage");
  //eslint-disable-next-line no-undef
  expect(myElement).toBeInTheDocument();
});

