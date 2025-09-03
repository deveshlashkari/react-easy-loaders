import { render, screen } from "@testing-library/react";
import { LoaderProvider } from "../core/LoaderProvider";
import { LoaderOverlay } from "../core/LoaderOverlay";
import { Spinner } from "../loaders/Spinner";

describe("LoaderProvider", () => {
  it("renders children", () => {
    render(
      <LoaderProvider value={{ color: "#ff0000", size: 50, speed: 1.5 }}>
        <div data-testid="child">Child Content</div>
      </LoaderProvider>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("provides theme values to loaders", () => {
    render(
      <LoaderProvider value={{ color: "#ff0000", size: 50, speed: 1.5 }}>
        <Spinner />
      </LoaderProvider>
    );

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveStyle({ width: "50px", height: "50px" });
  });
});

describe("LoaderOverlay", () => {
  it("does not render when open is false", () => {
    render(
      <LoaderOverlay open={false} loader={<Spinner />} message="Loading..." />
    );

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("renders when open is true", () => {
    render(
      <LoaderOverlay open={true} loader={<Spinner />} message="Loading..." />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders with default loader when none provided", () => {
    render(<LoaderOverlay open={true} message="Loading..." />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("applies custom backdrop color", () => {
    render(
      <LoaderOverlay
        open={true}
        loader={<Spinner />}
        message="Loading..."
        backdropColor="rgba(255, 0, 0, 0.5)"
      />
    );

    const overlay = screen.getAllByRole("status")[0]; // Get the outer overlay
    expect(overlay).toHaveStyle({ backgroundColor: "rgba(255, 0, 0, 0.5)" });
  });

  it("applies custom z-index", () => {
    render(
      <LoaderOverlay
        open={true}
        loader={<Spinner />}
        message="Loading..."
        zIndex={5000}
      />
    );

    const overlay = screen.getAllByRole("status")[0]; // Get the outer overlay
    expect(overlay).toHaveStyle({ zIndex: "5000" });
  });
});
