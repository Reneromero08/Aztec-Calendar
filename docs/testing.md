# Testing and Quality Assurance Guide

This document outlines testing strategies, validation procedures, and quality assurance processes for this project.

## Testing Overview

### Testing Pyramid

```
        Manual/E2E Testing
              ↑
       Integration Testing
              ↑
         Unit Testing
```

### Testing Strategy

- **Unit Tests**: Individual functions and components
- **Integration Tests**: Component interactions and features
- **Manual Testing**: User workflows and accessibility
- **Automated Testing**: Linting, type checking, builds

## Unit Testing

### Running Tests

```bash
# Watch mode (runs on changes)
npm run test

# Single run
npm run test:run

# With UI
npm run test:ui
```

### Writing Tests

#### Component Tests

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('should render with label text', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    
    const button = screen.getByRole('button', { name: 'Click me' });
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button label="Click me" onClick={() => {}} disabled={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
```

#### Utility Function Tests

```typescript
import { formatDate } from './formatDate';
import { describe, it, expect } from 'vitest';

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('January 15, 2024');
  });

  it('should handle different locales', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date, 'es')).toBe('15 de enero de 2024');
  });
});
```

### Test Coverage

Target coverage levels:
- **Statements**: >80%
- **Branches**: >75%
- **Functions**: >80%
- **Lines**: >80%

Check coverage:

```bash
npm run test:run -- --coverage
```

## Pre-Commit Testing

### Automated Checks

Before committing, ensure all checks pass:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Tests
npm run test:run
```

### Using Pre-commit Hooks

Install Git hooks:

```bash
npm install husky lint-staged --save-dev
npx husky install
```

Create `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint-staged
npm run type-check
```

## Accessibility Testing

### Manual Accessibility Testing

#### Keyboard Navigation

1. Use Tab key to navigate
2. Verify all interactive elements are reachable
3. Check focus indicators are visible
4. Ensure logical tab order
5. Look for keyboard traps

#### Screen Reader Testing

Test with NVDA, JAWS, or VoiceOver:

```bash
# Windows: NVDA
# https://www.nvaccess.org/

# macOS: VoiceOver (built-in)
# Enable: System Preferences → Accessibility → VoiceOver

# Test:
# - Page title announcement
# - Heading structure
# - Link descriptions
# - Form labels
# - Image alt text
# - Error messages
```

#### Color Contrast

1. Go to https://webaim.org/resources/contrastchecker/
2. Test text against backgrounds
3. Verify ≥4.5:1 ratio for normal text
4. Verify ≥3:1 ratio for large text

### Automated Accessibility Testing

```bash
# Using axe DevTools browser extension
# https://www.deque.com/axe/devtools/

# Or using CLI tools:
npm install -g pa11y
pa11y https://localhost:3000

# Or using Lighthouse in DevTools
# F12 → Lighthouse → Accessibility
```

## Performance Testing

### Build Performance

```bash
# Check build time
npm run build

# Analyze bundle size
npm install -g next-bundle-analyzer
```

### Runtime Performance

Using Chrome DevTools:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run Audit
4. Check Performance score

Targets:
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1

### Lighthouse Audit

```bash
npm install -g lighthouse
lighthouse https://localhost:3000 --view
```

## Code Quality

### Linting

```bash
# Check for issues
npm run lint

# Fix automatically
npm run lint -- --fix
```

### Type Checking

```bash
# Check TypeScript types
npm run type-check

# Or with watch mode
npm run type-check -- --watch
```

### Formatting

```bash
# Format with Prettier
npm install -g prettier
prettier --write "src/**/*.{ts,tsx}"
```

## Integration Testing

### Feature Testing

Test complete features across multiple components:

```typescript
describe('Calendar Feature', () => {
  it('should navigate between months', () => {
    render(<CalendarPage />);
    
    // Get current month
    const currentMonth = screen.getByText(/January 2024/);
    expect(currentMonth).toBeInTheDocument();
    
    // Navigate to next month
    const nextButton = screen.getByRole('button', { name: /Next/ });
    fireEvent.click(nextButton);
    
    // Check new month
    expect(screen.getByText(/February 2024/)).toBeInTheDocument();
  });
});
```

## End-to-End Testing

### Manual E2E Testing Checklist

- [ ] Navigation works correctly
- [ ] Calendar displays properly
- [ ] Date conversion is accurate
- [ ] Guide pages load
- [ ] Links work
- [ ] Forms submit
- [ ] Error handling works
- [ ] Mobile responsive
- [ ] Accessibility features work
- [ ] Dark mode works

### Browser Testing

Test on multiple browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

Test responsive breakpoints:
- Mobile: 375px
- Tablet: 768px
- Desktop: 1024px+

## Release Checklist

Before releasing, verify:

- [ ] All tests pass
- [ ] Types are correct
- [ ] Linting passes
- [ ] No console warnings
- [ ] Build succeeds
- [ ] Performance is acceptable
- [ ] Accessibility audit passes
- [ ] Manual testing complete
- [ ] Documentation updated
- [ ] Changelog updated

## Continuous Integration

### GitHub Actions

**.github/workflows/test.yml:**

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Test
        run: npm run test:run
      
      - name: Build
        run: npm run build
```

## Test Organization

### File Structure

```
src/
├── components/
│   ├── Button.tsx
│   └── __tests__/
│       └── Button.test.tsx
├── lib/
│   ├── formatDate.ts
│   └── __tests__/
│       └── formatDate.test.ts
└── test/
    └── setup.ts
```

### Test Setup

**src/test/setup.ts:**

```typescript
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});
```

## Troubleshooting Tests

### Common Issues

**Tests not running:**
```bash
# Clear cache
npm run test:run -- --clearCache

# Check config
cat vitest.config.ts
```

**Import errors:**
```bash
# Ensure correct module resolution
# Check tsconfig.json compilerOptions.moduleResolution
```

**Async test timeouts:**
```typescript
// Increase timeout if needed
it('should do async thing', async () => {
  // test code
}, 10000); // 10 second timeout
```

## Resources

### Testing Libraries

- **Vitest**: https://vitest.dev/
- **React Testing Library**: https://testing-library.com/
- **Testing Library Docs**: https://testing-library.com/docs/

### Learning Resources

- **Testing Library Best Practices**: https://testing-library.com/docs/guiding-principles
- **Jest Documentation**: https://jestjs.io/ (similar to Vitest)
- **MDN Testing**: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing

---

For more information, see:
- [CONTRIBUTING.md](../CONTRIBUTING.md)
- [docs/architecture.md](./architecture.md)
- [docs/accessibility.md](./accessibility.md)
