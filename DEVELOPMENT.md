# Development Guide

This guide covers development practices and conventions for the Educational Platform.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# In another terminal, run tests
npm run test

# Check code quality
npm run lint
npm run type-check
```

## Project Structure

```
.
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (metadata, accessibility)
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles & accessibility
│   │   ├── calendar/
│   │   │   ├── page.tsx        # Calendar page
│   │   │   └── __tests__/
│   │   │       └── page.test.tsx
│   │   ├── guide/
│   │   │   ├── page.tsx        # Guide page
│   │   │   └── __tests__/
│   │   │       └── page.test.tsx
│   │   └── __tests__/
│   │       └── page.test.tsx
│   ├── components/             # Reusable React components
│   ├── lib/                    # Utilities and helpers
│   │   ├── formatDate.ts       # Date formatting utilities
│   │   └── __tests__/
│   │       └── formatDate.test.ts
│   └── test/
│       └── setup.ts            # Test configuration
├── public/                     # Static assets
├── configuration files         # tsconfig, tailwind, etc.
└── package.json
```

## Adding Features

### Creating a New Page

1. Create a new directory under `src/app/`:
```bash
mkdir -p src/app/my-feature
```

2. Create `page.tsx`:
```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Feature - Educational Platform",
  description: "Description of my feature",
};

export default function MyFeature() {
  return (
    <main className="...">
      <h1>My Feature</h1>
    </main>
  );
}
```

3. Create tests in `__tests__/page.test.tsx`:
```typescript
import { render, screen } from "@testing-library/react";
import MyFeature from "../page";

describe("My Feature Page", () => {
  it("renders the page title", () => {
    render(<MyFeature />);
    expect(screen.getByText("My Feature")).toBeTruthy();
  });
});
```

### Creating a Reusable Component

1. Create `src/components/MyComponent.tsx`:
```typescript
interface MyComponentProps {
  title: string;
  description?: string;
}

export function MyComponent({ title, description }: MyComponentProps) {
  return (
    <div className="...">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
```

2. Create `src/components/__tests__/MyComponent.test.tsx`:
```typescript
import { render, screen } from "@testing-library/react";
import { MyComponent } from "../MyComponent";

describe("MyComponent", () => {
  it("renders the title", () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText("Test")).toBeTruthy();
  });
});
```

### Creating a Utility Function

1. Create `src/lib/myUtil.ts`:
```typescript
export function myFunction(input: string): string {
  return input.toUpperCase();
}
```

2. Create `src/lib/__tests__/myUtil.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { myFunction } from "../myUtil";

describe("myFunction", () => {
  it("converts to uppercase", () => {
    expect(myFunction("hello")).toBe("HELLO");
  });
});
```

## Styling

### Using Tailwind CSS

```typescript
export default function Example() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-primary-900 dark:text-primary-50">
        Title
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Description
      </p>
    </div>
  );
}
```

### Color Palette

**Primary (Sky Blue)**:
- `primary-50` to `primary-900` for main actions and links

**Accent (Purple)**:
- `accent-50` to `accent-900` for secondary elements

**Neutral**:
- `gray-50` to `gray-900` for text and backgrounds

### Responsive Design

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Single column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

### Dark Mode

Automatically respects system preference. Test with:
- Chrome DevTools: Rendering → Emulate CSS media feature prefers-color-scheme
- Or use `dark:` prefix in Tailwind classes

## Testing

### Running Tests

```bash
npm run test           # Watch mode
npm run test:run       # Run once
npm run test:ui        # Interactive UI
```

### Writing Tests

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "../MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    
    // Assert using screen queries
    expect(screen.getByText("Expected text")).toBeTruthy();
    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("handles user interaction", async () => {
    const { user } = render(<MyComponent />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("After click")).toBeTruthy();
  });
});
```

### Testing Best Practices

- Use semantic queries: `getByRole`, `getByLabelText`, `getByText`
- Avoid implementation details
- Test user behavior, not implementation
- Keep tests close to usage patterns
- Use descriptive test names

## Code Quality

### Linting

```bash
npm run lint  # Runs ESLint with --fix
```

Fix linting issues automatically or manually adjust code.

### Type Checking

```bash
npm run type-check
```

All TypeScript errors must be resolved before committing.

### Code Style

- 2-space indentation
- Double quotes for strings
- Trailing commas in objects
- Semicolons required
- 100-character line limit

Files are automatically formatted via Prettier on save if configured in your editor.

## Accessibility Guidelines

### Semantic HTML
```typescript
<main>        {/* Main content wrapper */}
  <h1>Title</h1>   {/* Proper heading hierarchy */}
  <nav>Navigation</nav>
  <section>Section</section>
</main>
```

### Focus Management
```typescript
// Focus styles automatically applied via globals.css
<button>Click me</button>  {/* 2px blue outline on focus */}
```

### Skip Link
Already implemented in root layout, no action needed.

### Color Contrast
Test with: https://webaim.org/resources/contrastchecker/

### ARIA Labels
```typescript
<button aria-label="Close menu">×</button>
<div role="status" aria-live="polite">Update message</div>
```

## Git Workflow

1. Create feature branch from `feat-scaffold-nextjs14-ts-tailwind`
2. Make changes
3. Run quality checks:
   ```bash
   npm run lint
   npm run type-check
   npm run test:run
   npm run build
   ```
4. Commit changes with clear messages
5. Push and create pull request

## Performance Tips

### Image Optimization
```typescript
import Image from "next/image";

<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  priority  // For above-the-fold images
/>
```

### Code Splitting
Next.js automatically splits code by route.

### Font Loading
```typescript
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});
```

### CSS Optimization
Tailwind CSS only includes used classes in production.

## Environment Setup

### Visual Studio Code Extensions
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- TypeScript Vue Plugin (Volar)
- Tailwind CSS IntelliSense

### Editor Configuration

Create `.vscode/settings.json`:
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Common Tasks

### Debug Tests
```bash
npm run test -- --inspect-brk
```

### Build Analysis
```bash
npm run build
npm run analyze  # If configured
```

### Check Bundle Size
```bash
npm run build  # Check .next size
```

### Update Dependencies
```bash
npm update           # Update to latest compatible
npm install          # Reinstall
npm audit fix        # Fix security issues
```

## Troubleshooting

### Build Fails
- Run `npm install` to ensure dependencies
- Check for TypeScript errors: `npm run type-check`
- Clear cache: `rm -rf .next`

### Tests Fail
- Check test setup file is correct
- Verify imports in test files
- Ensure components are exported properly

### Dev Server Won't Start
- Kill existing processes on port 3000
- Clear node_modules and reinstall
- Check for syntax errors

### Styling Issues
- Verify Tailwind classes are spelled correctly
- Check tailwind.config.ts content paths
- Ensure CSS file is imported in layout

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vitest Documentation](https://vitest.dev)
- [Testing Library Docs](https://testing-library.com)
- [Web Accessibility](https://www.w3.org/WAI)
