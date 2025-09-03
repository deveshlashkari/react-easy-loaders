# React Easy Loaders

[![npm version](https://badge.fury.io/js/react-easy-loaders.svg)](https://badge.fury.io/js/react-easy-loaders)
[![npm downloads](https://img.shields.io/npm/dm/react-easy-loaders.svg)](https://www.npmjs.com/package/react-easy-loaders)
[![Build Status](https://github.com/deveshlashkari/react-easy-loaders/actions/workflows/deploy.yml/badge.svg)](https://github.com/deveshlashkari/react-easy-loaders/actions)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/react-easy-loaders)](https://bundlephobia.com/package/react-easy-loaders)
[![React](https://img.shields.io/badge/React-%5E17.0.0%20%7C%7C%20%5E18.0.0-blue)](https://reactjs.org/)

A fully customizable React loader toolkit with theming, overlays, registry, and createLoader API.

## 🚀 [Live Demo & Documentation](https://deveshlashkari.github.io/react-easy-loaders)

Explore 12 beautiful loading animations, interactive examples, and comprehensive documentation on our GitHub Pages site.

---

## Quick Stats

- 📦 **Bundle Size**: < 8KB gzipped
- 🚀 **Zero Dependencies**: No external runtime dependencies
- ⚛️ **React Support**: Works with React 17 and 18
- 🔧 **TypeScript**: 100% TypeScript with full type definitions
- 🎯 **Framework Agnostic**: Next.js, Vite, CRA compatible
- 🎨 **12 Built-in Loaders**: Ready-to-use components

---

## Table of Contents

- [Quick Stats](#quick-stats)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Built-in Loaders](#built-in-loaders)
- [API Reference](#api-reference)
- [Customization](#customization)
- [Framework Compatibility](#framework-compatibility)
- [TypeScript Support](#typescript-support)
- [Links & Resources](#links--resources)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🎨 **12 Built-in Loaders**: Spinner, Ring, DualRing, Dots, Bars, Pulse, Bounce, Ripple, Roller, Grid, Wave, Progress
- 🎯 **Dual API Design**: Direct component usage and dynamic loader system
- 🎪 **Theme System**: Global theming with LoaderProvider
- 🔄 **Overlay System**: Full-screen loading states with context integration
- 🛠️ **Custom Loaders**: Create your own with `createLoader` function
- 🔧 **Registry System**: Register and manage custom loaders dynamically
- 📱 **SSR Compatible**: Works with Next.js and other SSR frameworks
- 🌳 **Tree Shakable**: Import only what you need
- ⚡ **Lightweight**: Minimal bundle size with zero dependencies
- 🎨 **Fully Customizable**: Easy CSS override system
- 🔧 **TypeScript First**: Complete type safety and IntelliSense support

## Installation

```bash
npm install react-easy-loaders
```

## Quick Start

### 1. Basic Usage

Import and use any loader directly:

```tsx
import { Spinner, Ring, Progress } from "react-easy-loaders";

function App() {
  return (
    <div>
      <Spinner color="#4CAF50" size={40} />
      <Ring color="#2196F3" size={50} />
      <Progress color="#FF9800" size={40} progress={75} />
    </div>
  );
}
```

### 2. With Theme Provider

Use the provider for consistent theming across all loaders:

```tsx
import { LoaderProvider, useLoader, Spinner } from "react-easy-loaders";

function MyComponent() {
  const { showLoader, hideLoader } = useLoader();

  const handleClick = () => {
    showLoader(<Spinner />, "Loading...");
    setTimeout(hideLoader, 3000);
  };

  return <button onClick={handleClick}>Show Loader</button>;
}

function App() {
  return (
    <LoaderProvider value={{ color: "#4CAF50", size: 40, speed: 1.2 }}>
      <MyComponent />
    </LoaderProvider>
  );
}
```

### 3. Dynamic Loader

Use the dynamic loader system to load any loader by name:

```tsx
import { Loader } from "react-easy-loaders";

function App() {
  return (
    <div>
      <Loader type="spinner" color="#4CAF50" size={50} />
      <Loader type="ring" color="#2196F3" size={50} />
      <Loader type="dots" color="#FF9800" size={50} />
    </div>
  );
}
```

## Built-in Loaders

Our library includes 12 beautiful, customizable loader components:

| Component      | Description                  | Animation Type    |
| -------------- | ---------------------------- | ----------------- |
| `<Spinner />`  | Classic spinning circle      | Rotation          |
| `<Ring />`     | Animated ring with dash      | Circular stroke   |
| `<DualRing />` | Double concentric rings      | Counter rotation  |
| `<Dots />`     | Three bouncing dots          | Vertical bounce   |
| `<Bars />`     | Scaling rectangular bars     | Height scaling    |
| `<Pulse />`    | Pulsing circle effect        | Scale transform   |
| `<Bounce />`   | Two bouncing circles         | Alternating scale |
| `<Ripple />`   | Water ripple effect          | Expanding rings   |
| `<Roller />`   | Rolling circles in sequence  | Sequential motion |
| `<Grid />`     | 3x3 grid of animated squares | Fade in/out       |
| `<Wave />`     | Horizontal wave animation    | Sequential bars   |
| `<Progress />` | Linear progress indicator    | Width transition  |

### Basic Props

All loaders accept these common properties:

```typescript
interface LoaderBaseProps {
  color?: string; // Primary color (default: "#4b6bfb")
  size?: number; // Size in pixels (default: 40)
  speed?: number; // Animation speed multiplier (default: 1)
  className?: string; // CSS class name
  style?: CSSProperties; // Inline styles
  ssrFallback?: ReactNode; // SSR fallback content
}
```

## API Reference

### LoaderProvider

The main provider component for global theming and overlay management:

```tsx
<LoaderProvider value={{ color: "#4CAF50", size: 40 }}>
  {/* Your app */}
</LoaderProvider>
```

#### Props

| Prop       | Type          | Default | Description                |
| ---------- | ------------- | ------- | -------------------------- |
| `value`    | `LoaderTheme` | `{}`    | Global theme configuration |
| `children` | `ReactNode`   | -       | Your app components        |

### useLoader Hook

Hook for programmatic overlay control:

```typescript
const { showLoader, hideLoader, setTheme } = useLoader();

// Show overlay loader
showLoader(<Spinner />, "Loading...");

// Hide overlay loader
hideLoader();

// Update theme
setTheme({ color: "#FF0000", size: 50 });
```

### LoaderOverlay Component

Direct overlay component usage:

```tsx
<LoaderOverlay
  open={isLoading}
  loader={<Spinner color="#fff" />}
  message="Loading your content..."
  backdropColor="rgba(0,0,0,0.7)"
  zIndex={9999}
  lockScroll={true}
/>
```

### createLoader Function

Create custom loaders:

```tsx
import { createLoader } from "react-easy-loaders";

const CustomLoader = createLoader(
  ({ color, size, speed, className, style }) => (
    <div className={className} style={{ ...style, color, fontSize: size }}>
      ⭐ {/* Your custom animation */}
    </div>
  )
);

// Use it
<CustomLoader color="gold" size={30} />;
```

### Dynamic Loader

```tsx
import { Loader } from "react-easy-loaders";

<Loader
  type="spinner"
  color="#4CAF50"
  size={40}
  // Any other props specific to the loader type
/>;
```

## Customization

Override CSS classes to customize appearance:

```css
/* Global loader styles */
.loader-base {
  /* Your custom styles */
}

/* Specific loader customization */
.custom-spinner {
  border-width: 3px;
  border-color: #your-color;
}

/* Overlay customization */
.loader-overlay {
  backdrop-filter: blur(4px);
}
```

## Framework Compatibility

### Next.js

```tsx
// pages/_app.tsx
import { LoaderProvider } from "react-easy-loaders";

export default function MyApp({ Component, pageProps }) {
  return (
    <LoaderProvider value={{ color: "#0070f3" }}>
      <Component {...pageProps} />
    </LoaderProvider>
  );
}
```

### Vite

```tsx
// main.tsx
import { LoaderProvider } from "react-easy-loaders";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LoaderProvider>
    <App />
  </LoaderProvider>
);
```

Works seamlessly with Create React App, Remix, and other React frameworks.

## TypeScript Support

Full TypeScript support with complete type definitions:

```typescript
import type {
  LoaderBaseProps,
  LoaderComponent,
  LoaderTheme,
  OverlayProps,
} from "react-easy-loaders";

const theme: LoaderTheme = {
  color: "#4CAF50",
  size: 40,
  speed: 1.2,
};

const customLoader: LoaderComponent = ({ color, size }) => (
  <div style={{ color, fontSize: size }}>Loading...</div>
);
```

## Links & Resources

[![npm](https://img.shields.io/badge/npm-react--easy--loaders-red)](https://www.npmjs.com/package/react-easy-loaders)
[![GitHub](https://img.shields.io/badge/GitHub-deveshlashkari%2Freact--easy--loaders-blue)](https://github.com/deveshlashkari/react-easy-loaders)
[![Demo](https://img.shields.io/badge/Demo-Live%20Site-green)](https://deveshlashkari.github.io/react-easy-loaders)
[![Docs](https://img.shields.io/badge/Docs-GitHub%20Pages-blue)](https://deveshlashkari.github.io/react-easy-loaders)

- 🚀 [**Live Demo & Examples**](https://deveshlashkari.github.io/react-easy-loaders) - Interactive demo with all loaders
- 📦 [**npm Package**](https://www.npmjs.com/package/react-easy-loaders) - Install via npm
- 🐙 [**GitHub Repository**](https://github.com/deveshlashkari/react-easy-loaders) - Source code and issues
- 🔧 [**TypeScript Definitions**](https://www.npmjs.com/package/react-easy-loaders?activeTab=code) - View type definitions
- 📊 [**Bundle Analysis**](https://bundlephobia.com/package/react-easy-loaders) - Package size analysis

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/deveshlashkari/react-easy-loaders.git
cd react-easy-loaders

# Install dependencies
npm install

# Build the package
npm run build

# Run demo locally
npm run demo:dev
```

### Scripts

| Script               | Description                      |
| -------------------- | -------------------------------- |
| `npm run build`      | Build the package for production |
| `npm run dev`        | Start demo development server    |
| `npm run demo:build` | Build demo for production        |
| `npm run typecheck`  | Type check the codebase          |
| `npm run clean`      | Clean build artifacts            |
| `npm run release`    | Build and publish to npm         |

## Contributing

Contributions are welcome! Here's how you can help:

1. 🍴 **Fork** the repository
2. 🔧 **Create** a feature branch: `git checkout -b feature/amazing-loader`
3. ✅ **Make** your changes and test them
4. 🧪 **Test** in the demo: `npm run demo:dev`
5. 📝 **Commit** your changes: `git commit -m 'Add amazing loader'`
6. 🚀 **Push** to the branch: `git push origin feature/amazing-loader`
7. 🎉 **Open** a Pull Request

### Guidelines

- Follow the existing code style and patterns
- Add new loaders to both the library and demo
- Update documentation as needed
- Ensure TypeScript types are properly defined
- Test your changes in multiple frameworks if possible

[![Contributors](https://img.shields.io/github/contributors/deveshlashkari/react-easy-loaders)](https://github.com/deveshlashkari/react-easy-loaders/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/deveshlashkari/react-easy-loaders)](https://github.com/deveshlashkari/react-easy-loaders/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## License

MIT © [Devesh Lashkari](https://github.com/deveshlashkari)

This project is licensed under the MIT License - see the [LICENSE](https://github.com/deveshlashkari/react-easy-loaders/blob/main/LICENSE) file for details.

function MyComponent() {
const { showLoader, hideLoader } = useLoader();

const handleClick = () => {
showLoader(<Spinner />, "Loading...");
setTimeout(hideLoader, 3000);
};

return <button onClick={handleClick}>Show Loader</button>;
}

function App() {
return (
<LoaderProvider value={{ color: "#4CAF50", size: 40 }}>
<MyComponent />
</LoaderProvider>
);
}

````

## 📚 Components

### Built-in Loaders

| Component      | Description             |
| -------------- | ----------------------- |
| `<Spinner />`  | Classic spinning loader |
| `<Ring />`     | Animated ring with dash |
| `<DualRing />` | Double ring animation   |
| `<Dots />`     | Bouncing dots           |
| `<Bars />`     | Scaling bars            |
| `<Pulse />`    | Pulsing circle          |
| `<Bounce />`   | Bouncing circles        |
| `<Ripple />`   | Water ripple effect     |
| `<Roller />`   | Rolling circles         |
| `<Grid />`     | Grid of squares         |
| `<Wave />`     | Wave animation          |
| `<Progress />` | Progress bar            |

### Core Components

- `<LoaderProvider />` - Theme provider
- `<LoaderOverlay />` - Full-screen overlay
- `<Loader />` - Dynamic loader by type
- `createLoader()` - Create custom loaders

### Hooks

- `useLoader()` - Control overlay loaders
- `useLoaderTheme()` - Access current theme

## 🎨 Theming

```tsx
import { LoaderProvider } from "react-easy-loaders";

const theme = {
  color: "#4CAF50",
  size: 40,
  speed: 1.2,
  className: "my-loader",
  style: { margin: "10px" },
};

function App() {
  return (
    <LoaderProvider value={theme}>
      {/* All loaders inherit theme */}
    </LoaderProvider>
  );
}
````

## 🛠️ Custom Loaders

```tsx
import { createLoader } from 'react-easy-loaders'

const HeartLoader = createLoader(
  ({ color, size, speed, className, style }) => (
    <div
      className={className}
      style={{
        fontSize: size,
        color,
        animation: `heartbeat ${1 / speed}s ease-in-out infinite`,
        ...style,
      }}
    >
      ❤️
      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
)

// Use it
<HeartLoader color="red" size={30} speed={2} />
```

## 📡 Dynamic Loaders

```tsx
import { Loader } from 'react-easy-loaders'

// Load any built-in loader by name
<Loader type="spinner" color="#4CAF50" size={40} />
<Loader type="ring" color="#2196F3" size={50} />
<Loader type="progress" progress={75} />
```

## 🔄 Overlay System

```tsx
import { LoaderOverlay, useLoader } from "react-easy-loaders";

// Method 1: Direct component
<LoaderOverlay
  open={isLoading}
  loader={<Spinner color="#fff" />}
  message="Loading your content..."
  backdropColor="rgba(0,0,0,0.7)"
/>;

// Method 2: Using context
function MyComponent() {
  const { showLoader, hideLoader } = useLoader();

  const handleLoad = async () => {
    showLoader(<Ring color="#fff" />, "Please wait...");
    await fetchData();
    hideLoader();
  };
}
```

## 🧪 Demo

Run the interactive demo to see all loaders in action:

```bash
# From the project root
npm run demo:install
npm run demo:dev
```

Or visit the [live demo](https://deveshlashkari.github.io/react-easy-loaders) (coming soon!)

This project is licensed under the MIT License - see the [LICENSE](https://github.com/deveshlashkari/react-easy-loaders/blob/main/LICENSE) file for details.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Devesh Lashkari](https://github.com/deveshlashkari)

## 🌟 Show Your Support

If this project helped you, please give it a ⭐️!

---

<p align="center">Made with ❤️ for the React community</p>
