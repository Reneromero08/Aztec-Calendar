# Configuration Guide

This document details all configurations used in the Educational Platform.

## Package Scripts

All scripts are defined in `package.json`:

```json
{
  "dev": "next dev",              // Start development server
  "build": "next build",          // Create production build
  "start": "next start",          // Start production server
  "lint": "eslint . --fix",       // Run ESLint and fix issues
  "type-check": "tsc --noEmit",   // TypeScript type checking
  "test": "vitest",               // Run tests in watch mode
  "test:ui": "vitest --ui",       // Run tests with interactive UI
  "test:run": "vitest --run"      // Run tests once and exit
}
```

## TypeScript Configuration (`tsconfig.json`)

Key settings:
- **Target**: ES2017 for broad browser compatibility
- **Strict Mode**: Enabled for type safety
- **JSX**: React 19 syntax
- **Path Aliases**: `@/*` points to `./src/*`
- **Module Resolution**: Bundler mode (optimal for Next.js)
- **Incremental Builds**: Enabled for faster subsequent builds

## Tailwind CSS Configuration (`tailwind.config.ts`)

### Theme Extensions

**Primary Colors** (Sky Blue):
```
50-900: Various shades from light sky to dark navy
Suitable for main CTAs, links, and primary UI elements
```

**Accent Colors** (Purple):
```
50-900: Various shades from light purple to dark plum
Used for secondary actions and highlights
```

### Content Paths
```
./src/pages/**/*.{js,ts,jsx,tsx,mdx}
./src/components/**/*.{js,ts,jsx,tsx,mdx}
./src/app/**/*.{js,ts,jsx,tsx,mdx}
```

## ESLint Configuration (`eslint.config.mjs`)

Uses the ESLint flat config format with:
- **eslint-config-next/core-web-vitals**: Next.js Web Vitals rules
- **eslint-config-next/typescript**: TypeScript support for Next.js
- **Global Ignores**: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Prettier Configuration (`.prettierrc`)

Code formatting rules:
```json
{
  "singleQuote": false,      // Use double quotes
  "trailingComma": "es5",    // Trailing commas in ES5 objects
  "tabWidth": 2,              // 2-space indentation
  "semi": true,               // Require semicolons
  "printWidth": 100           // 100-character line width
}
```

## PostCSS Configuration (`postcss.config.mjs`)

Applies Tailwind CSS PostCSS plugin for processing Tailwind directives in CSS files.

## Vitest Configuration (`vitest.config.ts`)

Test runner configuration:
- **Environment**: jsdom (for DOM testing)
- **Globals**: Enabled (no need to import test functions)
- **Setup Files**: `./src/test/setup.ts` (test utilities initialization)
- **Path Alias Resolution**: `@/*` support in tests

## Next.js Configuration (`next.config.ts`)

Standard Next.js configuration file ready for customization.

## Global CSS (`src/app/globals.css`)

### Imports
- Tailwind CSS for utility classes

### Root Theme Variables
```css
--background: #ffffff (dark: #0a0a0a)
--foreground: #171717 (dark: #ededed)
```

### Accessibility Styles

**Focus Visible**:
```css
2px solid #0284c7 outline with 2px offset
Applied to interactive elements: buttons, links, inputs, selects, textareas
```

**Reduced Motion**:
```css
Disables animations for users who prefer reduced motion
Sets animation-duration, animation-iteration-count, and transition-duration to 0.01ms
```

## Testing Setup (`src/test/setup.ts`)

- Imports `@testing-library/jest-dom` for enhanced DOM matchers
- Cleans up after each test with `cleanup()`
- Provides global test utilities via Vitest

## Accessibility Features

### Root Layout (`src/app/layout.tsx`)

**Skip Link**:
- Provides keyboard shortcut to main content
- Hidden off-screen until focused
- Uses `focus:top-0` for visibility on focus
- Blue background (`bg-primary-600`) with white text

**Main Content Wrapper**:
- Wrapped in `<div id="main-content">` for skip link targeting

### Metadata Configuration
- Language: English (`lang="en"`)
- Title: "Educational Platform"
- Description: Platform overview
- Viewport: Device width, initial scale 1.0
- Keywords: education, learning, guides, calendar

## Development Workflow

### 1. Starting Development
```bash
npm install        # Install dependencies
npm run dev       # Start dev server on http://localhost:3000
```

### 2. Code Quality
```bash
npm run lint         # Fix linting issues
npm run type-check   # Check TypeScript types
npm run test:run     # Run tests
```

### 3. Building for Production
```bash
npm run build   # Create optimized build
npm start       # Run production server
```

## Environment Variables

No environment variables required for basic setup. Create `.env.local` if needed for API keys or other configurations.

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dark Mode

Automatically respects system preference via `prefers-color-scheme` media query.

## Performance Optimizations

- **Image Optimization**: Next.js Image component used where applicable
- **Font Loading**: Google Fonts via next/font
- **CSS**: Tailwind CSS generates only used classes
- **Code Splitting**: Automatic via Next.js
- **Static Rendering**: All pages prerendered at build time

## Build Output

Production build creates:
- `.next/` directory with optimized assets
- Static pages prerendered as HTML
- JavaScript bundles optimized for production

## Extending the Configuration

### Adding New Colors
Edit `tailwind.config.ts` to add custom colors in the `colors` section.

### Modifying Typography
Update Tailwind `typography` plugin settings in `tailwind.config.ts`.

### Custom Fonts
Add fonts via `next/font` in layout files.

### Adding Environment Variables
1. Create `.env.local` (for local development)
2. Define variables: `NEXT_PUBLIC_*` for client-side
3. Access via `process.env.VARIABLE_NAME`

### Customizing ESLint Rules
Edit `eslint.config.mjs` to add custom rules or override defaults.
