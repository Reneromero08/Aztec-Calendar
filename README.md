# Educational Platform

A modern, fully-featured educational platform built with Next.js 14, TypeScript, and Tailwind CSS. The application provides a visually rich interface for managing learning schedules, accessing educational guides, and tracking progress.

## 🚀 Features

- **Next.js 14** with App Router for optimal performance
- **TypeScript** for type-safe development
- **Tailwind CSS** with custom educational color scheme
- **Accessibility First** with focus styles and skip links
- **Testing Infrastructure** with Vitest and React Testing Library
- **ESLint & Prettier** configured for code quality
- **Responsive Design** for mobile and desktop
- **Dark Mode Support** with system preferences

## 📋 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with accessibility features
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles with accessibility
│   ├── calendar/          # Calendar section
│   │   └── page.tsx
│   ├── guide/             # Learning guides section
│   │   └── page.tsx
│   ├── __tests__/         # Component tests
│   └── [route]/__tests__/
├── lib/                    # Utility functions
│   ├── formatDate.ts
│   └── __tests__/
└── test/
    └── setup.ts           # Test configuration
```

## 📦 Installation

```bash
npm install
```

## 🛠️ Available Scripts

### Development
```bash
npm run dev
```
Starts the development server at `http://localhost:3000`. The app will automatically reload on code changes.

### Build
```bash
npm run build
```
Creates an optimized production build.

### Production
```bash
npm start
```
Runs the production server.

### Linting
```bash
npm run lint
```
Runs ESLint to check code quality and automatically fix issues.

### Type Checking
```bash
npm run type-check
```
Performs TypeScript type checking without emitting files.

### Testing
```bash
npm run test
```
Runs tests in watch mode.

```bash
npm run test:run
```
Runs tests once and exits.

```bash
npm run test:ui
```
Runs tests with interactive UI.

## 🎨 Customization

### Tailwind Configuration
The custom Tailwind configuration in `tailwind.config.ts` includes:
- **Primary Colors**: Sky blue palette for main actions
- **Accent Colors**: Purple palette for secondary elements
- **Custom Spacing**: Safe area support for mobile
- **Typography**: Optimized for readability

Edit the theme section to customize colors and typography for your needs.

### ESLint & Prettier
- **ESLint**: Configured with Next.js specific rules and TypeScript support
- **Prettier**: Code formatter with 100-character line width
- **Files**: `.eslintrc` and `.prettierrc`

## ♿ Accessibility Features

The platform includes:
- **Skip Link**: Jump directly to main content (keyboard accessible)
- **Focus Styles**: Clear visual feedback for keyboard navigation
- **Reduced Motion**: Respects user motion preferences
- **Semantic HTML**: Proper heading hierarchy and ARIA attributes
- **Color Contrast**: WCAG AA compliant color combinations

## 🧪 Testing

Tests are configured with:
- **Vitest**: Fast unit test runner
- **React Testing Library**: Component testing utilities
- **jsdom**: DOM simulation for tests

Test files are located alongside source files in `__tests__` directories.

### Running Tests
```bash
# Watch mode
npm run test

# Single run
npm run test:run

# With UI
npm run test:ui
```

## 📚 Routes

- `/` - Home page with platform overview
- `/calendar` - Learning calendar and schedule
- `/guide` - Learning guides and resources

## 🎯 Getting Started for Developers

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)
5. Make changes to `src/` directory - changes will hot-reload
6. Run tests: `npm run test`
7. Check types: `npm run type-check`
8. Lint code: `npm run lint`

## 🔧 Configuration Files

- **`tsconfig.json`**: TypeScript configuration
- **`tailwind.config.ts`**: Tailwind CSS customization
- **`eslint.config.mjs`**: ESLint configuration
- **`.prettierrc`**: Prettier code formatting
- **`postcss.config.mjs`**: PostCSS plugins
- **`next.config.ts`**: Next.js configuration
- **`vitest.config.ts`**: Vitest testing configuration

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

The application is optimized for deployment on Vercel or any Node.js hosting platform:

```bash
npm run build
npm start
```

For Vercel:
```bash
vercel
```

## 📝 License

This project is provided as-is for educational purposes.

## 🤝 Contributing

When contributing, please:
1. Run tests: `npm run test:run`
2. Type check: `npm run type-check`
3. Lint: `npm run lint`
4. Follow the existing code style
5. Write tests for new features

## 📞 Support

For issues or questions, please refer to the documentation or create an issue in the repository.
