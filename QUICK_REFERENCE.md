# Quick Reference Card

## 🚀 Essential Commands

```bash
# Start development
npm run dev                # http://localhost:3000

# Build and run production
npm run build
npm start

# Code quality
npm run lint              # Auto-fix linting issues
npm run type-check        # Check TypeScript
npm run test:run          # Run tests once
npm run test              # Watch mode
npm run test:ui           # Interactive UI
```

## 📁 File Locations

| What | Where |
|------|-------|
| Pages | `src/app/*/page.tsx` |
| Components | `src/components/` |
| Utilities | `src/lib/` |
| Tests | `__tests__/` (near source) |
| Styles | `src/app/globals.css` |
| Config | Root: `*.config.ts`, `.*rc` |

## 🎨 Tailwind Quick Classes

```typescript
// Colors
className="text-primary-600 bg-accent-100"
className="dark:text-primary-50 dark:bg-gray-800"

// Responsive
className="w-full md:w-1/2 lg:w-1/3"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Common patterns
className="flex items-center justify-between"
className="rounded-lg shadow-md hover:shadow-lg"
className="transition-all duration-300"
```

## 🧪 Testing Pattern

```typescript
import { render, screen } from "@testing-library/react";
import { MyComponent } from "../MyComponent";

describe("MyComponent", () => {
  it("should...", () => {
    render(<MyComponent />);
    expect(screen.getByText("Expected")).toBeTruthy();
  });
});
```

## 📝 Metadata Pattern

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title - Educational Platform",
  description: "Page description",
};

export default function Page() {
  return <main>...</main>;
}
```

## ♿ Accessibility Checklist

- [ ] Semantic HTML: `<main>`, `<section>`, `<nav>`, `<h1>`-`<h6>`
- [ ] Focus styles: Interactive elements get blue outline
- [ ] Color contrast: Dark text on light, light on dark
- [ ] ARIA labels: `aria-label`, `aria-live`, `role` when needed
- [ ] Skip link: Already in root layout
- [ ] Keyboard navigation: All interactive elements focusable with Tab

## 🔧 Adding Features

### New Page
```bash
mkdir -p src/app/my-page
```
Create `src/app/my-page/page.tsx` with metadata and export default component

### New Component
Create `src/components/MyComponent.tsx` with props interface
Create `src/components/__tests__/MyComponent.test.tsx` for tests

### New Utility
Create `src/lib/myUtil.ts` with exported functions
Create `src/lib/__tests__/myUtil.test.ts` for tests

## 🐛 Debugging

```bash
# TypeScript errors
npm run type-check

# ESLint issues
npm run lint

# Test failures
npm run test -- --reporter=verbose

# Build issues
npm run build

# Port 3000 in use?
lsof -i :3000    # Find process
kill -9 <PID>    # Kill it
```

## 📦 Dependencies Overview

| Package | Purpose |
|---------|---------|
| `next@16` | Framework |
| `react@19` | UI library |
| `typescript@5` | Type safety |
| `tailwindcss@4` | Styling |
| `vitest@1` | Testing |
| `@testing-library/react` | Component testing |
| `eslint@9` | Linting |
| `prettier@3` | Formatting |

## 🎯 Best Practices

✅ DO
- Write tests for new features
- Use TypeScript interfaces for props
- Import only what you need
- Use semantic HTML elements
- Test accessibility features
- Follow Tailwind utility patterns

❌ DON'T
- Import entire modules if possible
- Use `any` type (use `unknown` if needed)
- Skip tests for UI changes
- Ignore TypeScript errors
- Use inline styles (use Tailwind)
- Hardcode colors (use Tailwind palette)

## 📚 Routes

- `/` - Home page
- `/calendar` - Learning calendar
- `/guide` - Learning guides

## 🌙 Dark Mode

Automatic based on system preference. Test in DevTools:
`Rendering → Emulate CSS media feature prefers-color-scheme`

## 🚢 Before Deploying

```bash
npm run lint           # Pass ✓
npm run type-check     # Pass ✓
npm run test:run       # Pass ✓
npm run build          # Pass ✓
```

## 📖 Docs

- Full README: `README.md`
- Config details: `CONFIGURATION.md`
- Development guide: `DEVELOPMENT.md`
- Setup status: `SETUP_COMPLETE.md`
