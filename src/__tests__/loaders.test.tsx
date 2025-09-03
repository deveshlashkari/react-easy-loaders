import { render, screen } from "@testing-library/react";
import { Spinner, Ring, Progress, Dots, Bars } from "../index";

describe("Loader Components", () => {
  describe("Spinner", () => {
    it("renders without crashing", () => {
      render(<Spinner />);
      const spinner = screen.getByRole("status");
      expect(spinner).toBeInTheDocument();
    });

    it("applies custom color", () => {
      render(<Spinner color="#ff0000" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveStyle({ border: "3px solid #ff0000" });
    });

    it("applies custom size", () => {
      render(<Spinner size={60} />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveStyle({ width: "60px", height: "60px" });
    });

    it("applies custom className", () => {
      render(<Spinner className="custom-spinner" />);
      const spinner = screen.getByRole("status");
      expect(spinner).toHaveClass("custom-spinner");
    });
  });

  describe("Ring", () => {
    it("renders without crashing", () => {
      render(<Ring />);
      const ring = screen.getByRole("status");
      expect(ring).toBeInTheDocument();
    });

    it("applies custom properties", () => {
      render(<Ring color="#00ff00" size={80} />);
      const ring = screen.getByRole("status");
      expect(ring).toHaveAttribute("width", "80");
      expect(ring).toHaveAttribute("height", "80");
    });
  });

  describe("Progress", () => {
    it("renders without crashing", () => {
      const { container } = render(<Progress />);
      const progress = container.firstChild;
      expect(progress).toBeInTheDocument();
    });

    it("displays correct progress value", () => {
      const { container } = render(<Progress progress={75} />);
      // Get all divs and take the inner one (child of the outer container)
      const outerDiv = container.firstChild as HTMLElement;
      const progressBar = outerDiv.firstChild as HTMLElement;
      expect(progressBar).toHaveStyle({ width: "75%" });
    });
  });

  describe("Dots", () => {
    it("renders without crashing", () => {
      const { container } = render(<Dots />);
      const dots = container.firstChild;
      expect(dots).toBeInTheDocument();
    });
  });

  describe("Bars", () => {
    it("renders without crashing", () => {
      const { container } = render(<Bars />);
      const bars = container.firstChild;
      expect(bars).toBeInTheDocument();
    });
  });
});
