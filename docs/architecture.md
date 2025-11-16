# Architecture Overview

This document describes the architecture and design of the Educational Platform, including its structure, key components, and design patterns.

## Project Structure

```
project/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout with Header/Footer
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css          # Global styles
│   │   ├── calendar/            # Calendar feature
│   │   │   ├── page.tsx
│   │   │   ├── aztec-calendar-wheel.tsx
│   │   │   ├── aztec-example.tsx
│   │   │   └── __tests__/
│   │   ├── guide/               # Learning guides feature
│   │   │   ├── page.tsx
│   │   │   ├── aztec-calendar/page.tsx
│   │   │   └── __tests__/
│   │   └── __tests__/           # Integration tests
│   │
│   ├── components/              # Reusable components
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Navigation header
│   │   │   └── Footer.tsx       # Footer component
│   │   ├── calendar/            # Calendar components
│   │   │   ├── CycleNavigator.tsx
│   │   │   ├── DateLookupForm.tsx
│   │   │   ├── GlossaryModal.tsx
│   │   │   ├── LearningToolsContainer.tsx
│   │   │   └── __tests__/
│   │   └── guide/               # Guide components
│   │       ├── DaySignCard.tsx
│   │       ├── MonthCard.tsx
│   │       ├── NumberCard.tsx
│   │       ├── GuideLayout.tsx
│   │       └── __tests__/
│   │
│   ├── lib/                     # Utilities and logic
│   │   ├── aztec-calendar/      # Aztec calendar library
│   │   │   ├── calculations.ts
│   │   │   ├── day-signs.ts
│   │   │   ├── xiuhpohualli-months.ts
│   │   │   ├── tonalpohualli-numbers.ts
│   │   │   ├── types.ts
│   │   │   ├── hooks.ts
│   │   │   ├── index.ts
│   │   │   └── __tests__/
│   │   ├── formatDate.ts        # Date utilities
│   │   └── __tests__/
│   │
│   ├── content/                 # Static content
│   │   └── guides/
│   │       └── aztec-calendar-guide.mdx
│   │
│   └── test/
│       └── setup.ts             # Test configuration
│
├── public/                       # Static assets
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
├── vitest.config.ts            # Vitest configuration
├── eslint.config.mjs           # ESLint configuration
└── package.json                # Dependencies
```

## Core Layers

### 1. Presentation Layer
- **Components**: React functional components with TypeScript
- **Layout**: Header and Footer shared across routes
- **Pages**: Next.js App Router pages for routing
- **Styling**: Tailwind CSS with custom design tokens

### 2. Business Logic Layer
- **Aztec Calendar Library**: Core calendar calculations and utilities
- **Hooks**: Custom React hooks for state management
- **Constants**: Day signs, months, numbers, and other data

### 3. Data Layer
- **Types**: TypeScript interfaces and types
- **Calculations**: Aztec calendar computation algorithms
- **Static Content**: MDX files for guides and documentation

## Key Components

### Layout Components

**Header**
- Navigation menu
- Responsive hamburger on mobile
- Accessibility features (skip links, semantic HTML)

**Footer**
- Links to resources
- Copyright information
- Responsive design

### Calendar Feature

**Components:**
- `AztecCalendarWheel`: Interactive calendar visualization
- `CycleNavigator`: Navigate between calendar cycles
- `DateLookupForm`: Convert dates to Aztec calendar
- `GlossaryModal`: Glossary of terms and symbols
- `LearningToolsContainer`: Container for learning tools

### Guide Feature

**Components:**
- `DaySignCard`: Display day sign information
- `MonthCard`: Display month information
- `NumberCard`: Display number information
- `GuideLayout`: Layout for guide pages

## Design System

### Color Palette

Defined in `tailwind.config.ts`:
- **Primary**: Sky blue for main actions
- **Accent**: Purple for secondary elements
- **Secondary**: Additional colors
- **Neutral**: Grays for backgrounds and borders
- **Night**: Dark colors for dark mode

### Typography

Font families mapped in configuration:
- **Body**: Source Sans 3 (--font-body)
- **Display**: Playfair Display (--font-display)
- **Mono**: IBM Plex Mono (--font-mono)

### Spacing

Custom spacing system:
- **Section**: Large section spacing
- **Gutter**: Horizontal padding
- Standard Tailwind spacing scale

## State Management

### Component State
- React hooks (useState, useReducer)
- Local component state
- No external state management library

### Custom Hooks
- `useAztecCalendar`: Main calendar logic
- Other domain-specific hooks in `lib/aztec-calendar/hooks.ts`

## Routing

Next.js App Router:
- `/`: Home page
- `/calendar`: Calendar visualization and tools
- `/guide`: Learning guides
- `/guide/aztec-calendar`: Specific guide pages

## Testing Strategy

### Unit Tests
- Component tests with React Testing Library
- Utility function tests with Vitest
- Located in `__tests__` directories

### Integration Tests
- Full feature testing
- API and component interaction

### Configuration
- **Vitest** for test runner
- **React Testing Library** for component testing
- **jsdom** for DOM simulation
- Test setup in `src/test/setup.ts`

## Performance Considerations

### Code Splitting
- Next.js automatic code splitting
- Route-based splitting for better performance

### Image Optimization
- Next.js Image component for optimization
- Lazy loading where appropriate

### CSS
- Tailwind CSS for minimal CSS output
- PostCSS for processing
- Dark mode support with CSS variables

## Accessibility Architecture

### WCAG 2.1 Compliance
- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels and attributes
- Color contrast requirements

### Keyboard Navigation
- Tab order management
- Focus indicators
- Keyboard event handling

### Screen Reader Support
- Semantic markup
- ARIA live regions
- Alternative text for images

## Build and Deployment

### Development
```bash
npm run dev
```
- Hot module reloading
- Fast refresh for changes
- Source maps for debugging

### Production Build
```bash
npm run build
npm start
```
- Optimized bundle
- Minified code
- Static generation where possible

### Deployment Targets
- Vercel (native Next.js support)
- Self-hosted Node.js servers
- Containerized deployment (Docker)

## Development Workflow

### Local Development
1. Install dependencies
2. Run development server
3. Make changes with hot reload
4. Run tests locally
5. Lint and type-check code
6. Create pull request

### Code Review
- All changes through pull requests
- Automated checks (linting, tests, types)
- Manual code review by maintainers
- CI/CD pipeline validation

## Dependencies

### Core
- **Next.js 14**: React framework
- **React 19**: UI library
- **TypeScript**: Type safety

### Styling
- **Tailwind CSS 4**: Utility-first CSS
- **PostCSS**: CSS processing

### Testing
- **Vitest**: Unit test runner
- **React Testing Library**: Component testing
- **jsdom**: DOM simulation

### Development
- **ESLint**: Code linting
- **Prettier**: Code formatting

See `package.json` for complete dependency list.

---

For more information, see:
- [CONTRIBUTING.md](../CONTRIBUTING.md) - How to contribute
- [docs/deployment.md](./deployment.md) - Deployment guide
- [docs/accessibility.md](./accessibility.md) - Accessibility guidelines
