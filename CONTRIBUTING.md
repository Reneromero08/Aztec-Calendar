# Contributing to This Project

Thank you for your interest in contributing! This guide will help you understand how to contribute to this project, whether you're fixing bugs, adding features, or improving documentation.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style Guide](#code-style-guide)
- [Testing](#testing)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Accessibility Guidelines](#accessibility-guidelines)
- [Asking for Help](#asking-for-help)

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please:

- **Be respectful**: Treat all contributors with respect and kindness
- **Be inclusive**: Welcome contributors of all backgrounds and experience levels
- **Be professional**: Keep discussions focused and constructive
- **Be supportive**: Help others learn and grow

## Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v8 or higher
- **Git**: v2.20 or later
- **TypeScript**: Knowledge of basic concepts

### Setting Up Your Development Environment

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/project.git
   cd project
   ```

2. **Add the upstream remote:**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/project.git
   git fetch upstream
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Branch Naming Conventions

Use descriptive branch names following this pattern:

```
[type]/[description]
```

**Types:**
- `feat/`: New feature
- `fix/`: Bug fix
- `docs/`: Documentation changes
- `style/`: Formatting or styling
- `refactor/`: Code refactoring
- `test/`: Test additions or updates
- `chore/`: Maintenance or tooling

**Examples:**
```bash
git checkout -b feat/add-new-calendar-feature
git checkout -b fix/accessibility-contrast-issue
git checkout -b docs/improve-setup-guide
```

### Making Changes

1. **Make focused, logical commits:**
   - One feature or fix per branch
   - Keep changes atomic and well-organized
   - Avoid mixing unrelated changes

2. **Keep your branch up to date:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

3. **Test your changes locally:**
   ```bash
   npm run test:run
   npm run type-check
   npm run lint
   ```

4. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Style Guide

### TypeScript/JavaScript

- Use TypeScript for all code
- Use const by default, let when needed, avoid var
- Use arrow functions for callbacks
- Use template literals for strings
- Use destructuring where appropriate
- Maximum line length: 100 characters

**Example:**
```typescript
// Good
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  const { target } = event;
  if (target instanceof HTMLButtonElement) {
    console.log(target.innerText);
  }
};

// Avoid
var handleClick = function(event) {
  console.log(event.target.innerText);
};
```

### React Components

- Use functional components with hooks
- Use TypeScript for prop types
- Use meaningful component names
- Keep components focused and reusable

**Example:**
```typescript
interface ButtonProps {
  onClick: () => void;
  label: string;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  label, 
  variant = 'primary' 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
};
```

### CSS/Tailwind

- Use Tailwind CSS utility classes
- Follow the design system in `tailwind.config.ts`
- Use CSS custom properties for theme values
- Avoid custom CSS unless necessary
- Use meaningful class names if creating custom classes

### File Organization

- Keep related files together
- Use index.ts for exports
- Place tests alongside source files in `__tests__` directories
- Use PascalCase for component files
- Use camelCase for utility files

## Testing

### Running Tests

```bash
# Watch mode
npm run test

# Single run
npm run test:run

# With UI
npm run test:ui
```

### Writing Tests

- Write tests for all new features
- Aim for >80% code coverage
- Use descriptive test names
- Test user behavior, not implementation details
- Use React Testing Library for component tests

**Example:**
```typescript
describe('Button Component', () => {
  it('should call onClick handler when clicked', () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <Button onClick={handleClick} label="Click me" />
    );
    
    const button = getByText('Click me');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Pre-commit Checks

Always run these before committing:

```bash
npm run type-check
npm run lint
npm run test:run
```

## Commit Messages

Follow the Conventional Commits format:

```
[type]([scope]): [subject]

[body]

[footer]
```

### Components

**Type** (required):
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Test changes
- `chore`: Build, tooling, dependencies

**Scope** (optional): Area affected (e.g., calendar, guide, components)

**Subject** (required):
- Imperative mood ("add" not "added")
- Don't capitalize first letter
- No period at the end
- Under 50 characters

**Body** (optional):
- Explain what and why
- Wrap at 72 characters
- Separate from subject with blank line

**Footer** (optional):
- Reference issues: `Closes #123`
- Breaking changes: `BREAKING CHANGE: description`

### Examples

```bash
# Simple
git commit -m "feat(calendar): add date picker component"

# With body
git commit -m "fix(accessibility): improve color contrast

- Updated primary colors to meet WCAG AA
- Tested with accessibility checker
- Fixes #123"
```

## Pull Request Process

### Before Opening a PR

1. Sync with upstream:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Push your changes:
   ```bash
   git push origin feature/your-feature
   ```

3. Verify CI passes (if applicable)

### PR Title and Description

**Title:** `[type]: Brief description`

**Description:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Breaking change

## Testing
- [ ] Unit tests added
- [ ] Manual testing completed
- [ ] All tests passing

## Related Issues
Closes #123
```

### PR Checklist

- [ ] Code follows style guide
- [ ] Tests are passing
- [ ] Types are correct
- [ ] No console errors or warnings
- [ ] Documentation is updated
- [ ] Changes are atomic and well-organized

### Addressing Review Comments

1. Acknowledge feedback
2. Make requested changes on your branch
3. Commit with clear messages
4. Don't force push unless asked
5. Mark conversations as resolved

## Accessibility Guidelines

All code must be accessible. See [docs/accessibility.md](./docs/accessibility.md) for detailed guidelines.

### Key Principles

- Follow WCAG 2.1 AA standards
- Test with keyboard navigation
- Include proper ARIA labels
- Maintain sufficient color contrast
- Test with screen readers

## Asking for Help

### Resources

- **GitHub Issues**: Report bugs or request features
- **Discussions**: Ask questions and discuss ideas
- **Documentation**: Check [docs/](./docs/) directory
- **Code Review Comments**: Ask for clarification

### Creating Issues

When reporting issues:

1. **Check existing issues** first
2. **Use a clear title** describing the problem
3. **Include reproduction steps**
4. **Provide environment info** (OS, browser, Node version)
5. **Add screenshots** if applicable

---

Thank you for contributing! 🎉
