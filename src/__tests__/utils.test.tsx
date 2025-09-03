import { render } from '@testing-library/react';
import { createLoader } from '../core/createLoader';
import { LoaderRegistry } from '../core/registry';
import { isBrowser, ensureStyle, dur } from '../utils';
import { LoaderProvider } from '../core/LoaderProvider';

// Mock DOM for testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
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

describe('createLoader', () => {
  it('creates a custom loader component', () => {
    const CustomLoader = createLoader(({ color = '#000', size = 40 }) => (
      <div 
        data-testid="custom-loader"
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: color 
        }} 
      />
    ));

    expect(CustomLoader).toBeDefined();
    expect(typeof CustomLoader).toBe('function');
  });

  it('applies theme values from LoaderProvider', () => {
    const CustomLoader = createLoader(({ color = '#000', size = 40 }) => (
      <div 
        data-testid="themed-custom-loader"
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: color 
        }} 
      />
    ));

    const { container } = render(
      <LoaderProvider value={{ color: '#ff0000', size: 60 }}>
        <CustomLoader />
      </LoaderProvider>
    );

    const loaderDiv = container.querySelector('[data-testid="themed-custom-loader"]');
    expect(loaderDiv).toHaveStyle({
      width: '60px',
      height: '60px',
      backgroundColor: '#ff0000'
    });
  });

  it('merges props with theme values correctly', () => {
    const CustomLoader = createLoader(({ color = '#000', size = 40 }) => (
      <div 
        data-testid="prop-override-loader"
        style={{ 
          width: size, 
          height: size, 
          backgroundColor: color 
        }} 
      />
    ));

    const { container } = render(
      <LoaderProvider value={{ color: '#ff0000', size: 60 }}>
        <CustomLoader size={80} />
      </LoaderProvider>
    );

    const loaderDiv = container.querySelector('[data-testid="prop-override-loader"]');
    expect(loaderDiv).toHaveStyle({
      width: '80px', // prop override
      height: '80px',
      backgroundColor: '#ff0000' // from theme
    });
  });
});

describe('LoaderRegistry', () => {
  beforeEach(() => {
    // Clear registry before each test
    LoaderRegistry.list().forEach(name => {
      LoaderRegistry.remove(name);
    });
  });

  it('allows registering and retrieving custom loaders', () => {
    const testLoader = createLoader(() => <div>Test Loader</div>);
    
    LoaderRegistry.add('TestLoader', testLoader);
    
    const retrieved = LoaderRegistry.get('TestLoader');
    expect(retrieved).toBe(testLoader);
  });

  it('handles case-insensitive loader names', () => {
    const testLoader = createLoader(() => <div>Test Loader</div>);
    
    LoaderRegistry.add('TestLoader', testLoader);
    
    const retrieved = LoaderRegistry.get('TESTLOADER');
    expect(retrieved).toBe(testLoader);
  });

  it('returns undefined for non-existent loaders', () => {
    const retrieved = LoaderRegistry.get('NonExistentLoader');
    expect(retrieved).toBeUndefined();
  });

  it('lists all registered loaders', () => {
    const loader1 = createLoader(() => <div>1</div>);
    const loader2 = createLoader(() => <div>2</div>);
    
    LoaderRegistry.add('Loader1', loader1);
    LoaderRegistry.add('Loader2', loader2);
    
    const list = LoaderRegistry.list();
    expect(list).toContain('loader1');
    expect(list).toContain('loader2');
    expect(list).toHaveLength(2);
  });

  it('allows removing loaders', () => {
    const testLoader = createLoader(() => <div>Test</div>);
    
    LoaderRegistry.add('TestLoader', testLoader);
    expect(LoaderRegistry.get('TestLoader')).toBe(testLoader);
    
    LoaderRegistry.remove('TestLoader');
    expect(LoaderRegistry.get('TestLoader')).toBeUndefined();
  });
});

describe('utils', () => {
  describe('isBrowser', () => {
    it('returns true in test environment', () => {
      expect(isBrowser).toBe(true);
    });
  });

  describe('ensureStyle', () => {
    beforeEach(() => {
      // Clear any existing styles
      const existingStyles = document.querySelectorAll('style[data-rel^="rel-"]');
      existingStyles.forEach(style => style.remove());
    });

    it('injects style tag with unique key', () => {
      ensureStyle('test-key', '.test { color: red; }');
      
      const styleTag = document.querySelector('style[data-rel="rel-test-key"]');
      expect(styleTag).toBeInTheDocument();
      expect(styleTag?.textContent).toBe('.test { color: red; }');
    });

    it('does not inject duplicate styles with same key', () => {
      ensureStyle('duplicate-key', '.test1 { color: red; }');
      ensureStyle('duplicate-key', '.test2 { color: blue; }');
      
      const styleTags = document.querySelectorAll('style[data-rel="rel-duplicate-key"]');
      expect(styleTags).toHaveLength(1);
      expect(styleTags[0]?.textContent).toBe('.test1 { color: red; }');
    });
  });

  describe('dur', () => {
    it('calculates duration with default speed', () => {
      expect(dur(1)).toBe('1s');
      expect(dur(2)).toBe('2s');
    });

    it('calculates duration with custom speed multiplier', () => {
      expect(dur(1, 2)).toBe('0.5s'); // faster
      expect(dur(2, 0.5)).toBe('4s'); // slower
    });

    it('handles edge cases with very small values', () => {
      expect(dur(0, 1)).toBe('0.0001s');
      expect(dur(1, 0)).toBe('10000s'); // speed cannot be 0
    });
  });
});
