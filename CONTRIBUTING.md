# Contributing to React Easy Loaders

We love your input! We want to make contributing to React Easy Loaders as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

## Report bugs using GitHub's [issue tracker](https://github.com/deveshlashkari/react-easy-loaders/issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/deveshlashkari/react-easy-loaders/issues/new).

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/deveshlashkari/react-easy-loaders.git
   cd react-easy-loaders
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the library:

   ```bash
   npm run build
   ```

4. Run the demo:
   ```bash
   npm run demo:install
   npm run demo:dev
   ```

## Adding New Loaders

To add a new loader component:

1. Create a new file in `src/loaders/` (e.g., `MyLoader.tsx`)
2. Use the `createLoader` function:

   ```tsx
   import React from "react";
   import { createLoader } from "../core/createLoader";
   import { dur, ensureStyle } from "../utils";
   import type { LoaderBaseProps } from "../types";

   export const MyLoader = createLoader(
     ({ color, size, speed, className, style }: LoaderBaseProps) => {
       // Your loader implementation
       return <div>...</div>;
     }
   );
   ```

3. Export it from `src/loaders/index.ts`
4. Add it to the main export in `src/index.tsx`
5. Update the `Loader` component mapping if needed
6. Add it to the demo in `demo/src/App.tsx`

## Code Style

- Use TypeScript for all code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure all props are properly typed

## Testing

While we don't have automated tests yet, please:

- Test your changes in the demo application
- Ensure the build passes: `npm run build`
- Check that all loaders work correctly
- Test with different props (color, size, speed, etc.)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## References

This document was adapted from the open-source contribution guidelines for [Facebook's Draft](https://github.com/facebook/draft-js/blob/a9316a723f9e918afde44dea68b5f9f39b7d9b00/CONTRIBUTING.md).
