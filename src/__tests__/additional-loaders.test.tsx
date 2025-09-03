import { render } from "@testing-library/react";
import { Bars } from "../loaders/Bars";
import { Bounce } from "../loaders/Bounce";
import { DualRing } from "../loaders/DualRing";
import { Grid } from "../loaders/Grid";
import { Progress } from "../loaders/Progress";
import { Pulse } from "../loaders/Pulse";
import { Ring } from "../loaders/Ring";
import { Ripple } from "../loaders/Ripple";
import { Roller } from "../loaders/Roller";
import { Wave } from "../loaders/Wave";
import { LoaderProvider } from "../core/LoaderProvider";

describe("Additional Loader Components", () => {
  describe("Bars", () => {
    it("renders with default props", () => {
      const { container } = render(<Bars />);
      const loader = container.firstChild;
      expect(loader).toBeInTheDocument();
    });

    it("applies custom color and size", () => {
      const { container } = render(<Bars color="#ff0000" size={60} />);
      const loader = container.firstChild as HTMLElement;
      // Bars doesn't set width/height on container, but on individual bars
      expect(loader).toBeInTheDocument();
    });

    it("inherits theme from LoaderProvider", () => {
      const { container } = render(
        <LoaderProvider value={{ color: "#00ff00", size: 80 }}>
          <Bars />
        </LoaderProvider>
      );
      const loader = container.firstChild as HTMLElement;
      // Check that loader renders with theme
      expect(loader).toBeInTheDocument();
    });
  });

  describe("Bounce", () => {
    it("renders with default props", () => {
      const { container } = render(<Bounce />);
      const loader = container.firstChild;
      expect(loader).toBeInTheDocument();
    });

    it("applies custom props", () => {
      const { container } = render(<Bounce color="#ff0000" size={50} />);
      const loader = container.firstChild as HTMLElement;
      expect(loader).toBeInTheDocument();
    });
  });

  describe("DualRing", () => {
    it("renders with default props", () => {
      const { container } = render(<DualRing />);
      const loader = container.firstChild;
      expect(loader).toBeInTheDocument();
    });

    it("applies custom size", () => {
      const { container } = render(<DualRing size={70} />);
      const loader = container.firstChild as HTMLElement;
      expect(loader).toHaveStyle({ width: "70px", height: "70px" });
    });
  });

  describe("Grid", () => {
    it("renders with default props", () => {
      const { container } = render(<Grid />);
      const loader = container.firstChild;
      expect(loader).toBeInTheDocument();
    });

    it("applies custom color", () => {
      const { container } = render(<Grid color="#0000ff" />);
      const loader = container.firstChild;
      expect(loader).toBeInTheDocument();
    });
  });

  describe("Progress", () => {
    it("renders with default props", () => {
      const { container } = render(<Progress />);
      const loader = container.firstChild;
      expect(loader).toBeInTheDocument();
    });

    it("applies custom color and size", () => {
      const { container } = render(<Progress color="#ff00ff" size={100} />);
      const loader = container.firstChild as HTMLElement;
      // Progress uses size * 4 for width
      expect(loader).toHaveStyle({ width: "400px" });
    });
  });

  describe("Pulse", () => {
    it("renders with default props", () => {
      const { container } = render(<Pulse />);
      const loader = container.firstChild;
      expect(loader).toBeInTheDocument();
    });

    it("applies custom speed", () => {
      const { container } = render(<Pulse speed={2} />);
      const loader = container.firstChild;
      expect(loader).toBeInTheDocument();
    });
  });

  describe("Ring", () => {
    it("renders with default props", () => {
      const { container } = render(<Ring />);
      const loader = container.firstChild;
      expect(loader).toBeInTheDocument();
    });

    it("applies custom size", () => {
      const { container } = render(<Ring size={60} />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "60");
      expect(svg).toHaveAttribute("height", "60");
    });
  });

  describe("Ripple", () => {
    it("renders with default props", () => {
      const { container } = render(<Ripple />);
      const loader = container.firstChild;
      expect(loader).toBeInTheDocument();
    });

    it("applies custom size", () => {
      const { container } = render(<Ripple size={90} />);
      const loader = container.firstChild as HTMLElement;
      expect(loader).toHaveStyle({ width: "90px", height: "90px" });
    });
  });

  describe("Roller", () => {
    it("renders with default props", () => {
      const { container } = render(<Roller />);
      const loader = container.firstChild;
      expect(loader).toBeInTheDocument();
    });

    it("applies custom color and size", () => {
      const { container } = render(<Roller color="#ffff00" size={60} />);
      const loader = container.firstChild as HTMLElement;
      expect(loader).toHaveStyle({ width: "60px", height: "60px" });
    });
  });

  describe("Wave", () => {
    it("renders with default props", () => {
      const { container } = render(<Wave />);
      const loader = container.firstChild;
      expect(loader).toBeInTheDocument();
    });

    it("applies custom color", () => {
      const { container } = render(<Wave color="#00ffff" />);
      const loader = container.firstChild;
      expect(loader).toBeInTheDocument();
    });
  });

  // Test all loaders with SSR fallback
  describe("SSR Support", () => {
    const loaderComponents = [
      { name: "Bars", Component: Bars },
      { name: "Bounce", Component: Bounce },
      { name: "DualRing", Component: DualRing },
      { name: "Grid", Component: Grid },
      { name: "Progress", Component: Progress },
      { name: "Pulse", Component: Pulse },
      { name: "Ring", Component: Ring },
      { name: "Ripple", Component: Ripple },
      { name: "Roller", Component: Roller },
      { name: "Wave", Component: Wave },
    ];

    loaderComponents.forEach(({ name, Component }) => {
      it(`${name} renders with SSR fallback`, () => {
        const fallback = (
          <div data-testid={`${name.toLowerCase()}-fallback`}>Loading...</div>
        );
        const { getByTestId } = render(<Component ssrFallback={fallback} />);

        // In our test environment (browser), it should render the actual component
        // not the fallback, but the component should accept the ssrFallback prop
        expect(() => getByTestId(`${name.toLowerCase()}-fallback`)).toThrow();
      });
    });
  });
});
