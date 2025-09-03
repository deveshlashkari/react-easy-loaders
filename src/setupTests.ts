import "@testing-library/jest-dom";

// Mock CSS animations for testing
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock for CSS animations
(globalThis as any).CSS = {
  supports: jest.fn(() => true),
};

// Mock for requestAnimationFrame
(globalThis as any).requestAnimationFrame = jest.fn(
  (cb: FrameRequestCallback) => setTimeout(cb, 16)
);
(globalThis as any).cancelAnimationFrame = jest.fn((id: number) =>
  clearTimeout(id)
);
