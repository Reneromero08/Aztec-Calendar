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

- **Git**: v2.20 or later
- **A text editor**: VS Code, Sublime, Atom, etc.
- **A web browser**: Chrome, Firefox, Safari, or Edge for testing
- **Basic HTML/CSS knowledge**: Familiarity with semantic HTML and CSS

**That's it!** No Node.js, npm, or build tools required.

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

3. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Open in your editor:**
   ```bash
   code .  # or your preferred editor
   ```

5. **View locally:**
   ```bash
   # Option 1: Open directly
   open index.html

   # Option 2: Serve with Python
   python3 -m http.server 8000
   # Visit http://localhost:8000
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
- `a11y/`: Accessibility improvements
- `chore/`: Maintenance or updates

**Examples:**
```bash
git checkout -b feat/add-new-page
git checkout -b fix/calendar-interaction
git checkout -b docs/improve-deployment-guide
git checkout -b a11y/improve-focus-styles
```

### Making Changes

1. **Edit files** - Make focused, logical changes:
   - One feature or fix per branch
   - Keep changes atomic and well-organized
   - Avoid mixing unrelated changes

2. **Keep your branch up to date:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

3. **Test your changes locally:**
   - Open all changed HTML files in a browser
   - Test in multiple browsers (Chrome, Firefox, Safari, Edge)
   - Test on mobile (use DevTools device emulation)
   - Check console for errors (F12 → Console tab)
   - Verify keyboard navigation works

4. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Style Guide

### HTML

- **Use semantic tags:**
  ```html
  ✓ Good - use semantic HTML
  <article>, <section>, <nav>, <aside>, <header>, <footer>, <main>

  ✗ Bad - avoid non-semantic
  <div class="article">, <div class="section">
  ```

- **Proper heading hierarchy:**
  ```html
  ✓ Good
  <h1>Page Title</h1>
  <h2>Section</h2>
  <h3>Subsection</h3>

  ✗ Bad - don't skip levels
  <h1>Page Title</h1>
  <h3>Subsection</h3>  <!-- skipped h2 -->
  ```

- **ARIA labels for interactive elements:**
  ```html
  ✓ Good
  <button aria-label="Toggle menu">Menu</button>
  <a href="./page.html" aria-current="page">Current</a>

  ✗ Bad
  <button>☰</button>
  <a href="./page.html">Link</a>
  ```

- **Relative paths only:**
  ```html
  ✓ Good - relative paths
  <a href="./page.html">Link</a>
  <img src="./assets/images/icon.svg" alt="Icon">

  ✗ Bad - absolute paths won't work
  <a href="/page.html">Link</a>
  <a href="page.html">Link</a>
  ```

### CSS

- **Use custom properties instead of hardcoding:**
  ```css
  ✓ Good - uses design tokens
  color: var(--color-primary-500);
  padding: var(--spacing-md);

  ✗ Bad - hardcoded values
  color: #2e8a76;
  padding: 1rem;
  ```

- **Mobile-first approach:**
  ```css
  ✓ Good
  width: 100%;              /* Mobile default */
  @media (min-width: 768px) {
    width: 50%;             /* Tablet+ */
  }

  ✗ Bad - desktop first
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
  ```

- **Use clamp() for responsive sizes:**
  ```css
  ✓ Good - fluid sizing
  font-size: clamp(1rem, 2vw, 1.5rem);
  padding: clamp(1rem, 3vw, 2rem);

  ✗ Bad - fixed sizes
  font-size: 1.25rem;
  padding: 1.5rem;
  ```

### JavaScript

- **Use vanilla JavaScript** (no frameworks needed)
- **Clear, semantic variable names:**
  ```javascript
  ✓ Good
  const handleMenuToggle = () => { /* ... */ };
  const isMenuOpen = true;

  ✗ Bad
  const toggle = () => { /* ... */ };
  const x = true;
  ```

- **Event listeners with semantic selectors:**
  ```javascript
  ✓ Good
  const button = document.querySelector('button[aria-label="Menu"]');
  button.addEventListener('click', handleMenuToggle);

  ✗ Bad
  const btn = document.querySelector('.menu-btn');
  btn.onclick = function() { /* ... */ };
  ```

- **Comments only for complex logic:**
  ```javascript
  ✓ Good - obvious code
  const calculateTotal = items => items.reduce((sum, item) => sum + item.price, 0);

  ✓ Good - complex code with comment
  // Use binary search for O(log n) lookup performance
  const index = binarySearch(sortedArray, target);
  ```

### File Organization

- Keep related HTML, CSS, and JS together
- Use semantic, descriptive file names (lowercase, hyphens)
- Place assets in `assets/` directory by type (css, images, js, data)
- Keep directory structure flat and minimal

## Testing

### Manual Testing Checklist

Before committing any changes:

1. **Visual Testing:**
   - [ ] Open changed HTML files in browser
   - [ ] Verify layout looks correct
   - [ ] Check colors and styling applied properly
   - [ ] Test on desktop, tablet, and mobile sizes

2. **Functional Testing:**
   - [ ] Click all interactive elements
   - [ ] Verify links navigate correctly
   - [ ] Test forms and inputs (if applicable)
   - [ ] Verify animations/transitions work smoothly

3. **Browser Testing:**
   - [ ] Chrome/Chromium (latest)
   - [ ] Firefox (latest)
   - [ ] Safari (latest)
   - [ ] Edge (latest)

4. **Accessibility Testing:**
   - [ ] Navigate entire page with keyboard (Tab, Enter, Escape)
   - [ ] Focus indicators are visible
   - [ ] Check console for no errors
   - [ ] Test with screen reader (if possible)

5. **Console Check:**
   - [ ] Open DevTools (F12)
   - [ ] Go to Console tab
   - [ ] No red errors
   - [ ] No 404s for assets in Network tab

### Pre-commit Checks

Always verify before committing:

```bash
# 1. Check all HTML files render without errors
# - Open index.html, calendar.html, guide.html, guide-aztec-calendar.html
# - Check browser console for errors

# 2. Test in multiple browsers
# - At least Chrome and Firefox

# 3. Test keyboard navigation
# - Tab through all interactive elements
# - Escape should close mobile menu
# - No keyboard traps

# 4. Verify assets load
# - All CSS loads (no unstyled content)
# - All images display
# - No broken links
```

## Commit Messages

Follow this format:

```
[type]: Brief description (under 50 characters)

Optional detailed explanation of the change.
Explain what changed and why, wrapped at 72 characters.

References: Closes #123
```

### Types

- `feat`: New feature or page
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, white space, semicolons
- `refactor`: Code restructuring without functionality change
- `a11y`: Accessibility improvements
- `chore`: Updates to configuration or dependencies

### Examples

```bash
# Simple commit
git commit -m "feat: add new guide page"

# With detailed explanation
git commit -m "fix: improve color contrast on buttons

- Updated button colors to meet WCAG AA standards
- Tested with accessibility checker
- Verified in dark mode

Closes #42"

# Accessibility improvement
git commit -m "a11y: add ARIA labels to navigation menu

- Added aria-label to menu toggle button
- Added aria-current to active navigation links
- Tested with keyboard navigation"
```

## Pull Request Process

### Before Opening a PR

1. **Sync with upstream:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push your changes:**
   ```bash
   git push origin feature/your-feature
   ```

3. **Verify your changes:**
   - All tests pass (visual testing in browsers)
   - No console errors
   - Accessibility standards met
   - Documentation updated if needed

### PR Title and Description

**Title:** Use the format: `[type]: Brief description`

**Description:** Include:
```markdown
## Description
What changes were made and why?

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Accessibility improvement
- [ ] Other: ...

## Testing
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Tested on mobile
- [ ] Keyboard navigation verified
- [ ] Accessibility checked

## Checklist
- [ ] Code follows style guide
- [ ] No console errors
- [ ] Documentation updated
- [ ] Accessibility maintained

## Related Issues
Closes #123
```

### PR Checklist

- [ ] Code follows style guide (semantic HTML, CSS with variables, vanilla JS)
- [ ] Manual testing completed across browsers
- [ ] Mobile responsive and touch-friendly
- [ ] No console errors or warnings
- [ ] Accessibility maintained (keyboard nav, focus styles, ARIA labels)
- [ ] Documentation updated if needed
- [ ] Commit messages are descriptive

### Addressing Review Comments

1. Read feedback carefully
2. Make requested changes on your branch
3. Commit with clear messages explaining the changes
4. Push to update the PR
5. Mark conversations as resolved after addressing

## Accessibility Guidelines

**All contributions must maintain or improve accessibility.**

### Required for All Changes

- [ ] **Semantic HTML** - Use proper heading hierarchy (h1 → h2 → h3)
- [ ] **ARIA labels** - Interactive elements have descriptive labels
- [ ] **Color contrast** - Text meets WCAG AA (4.5:1 for normal text)
- [ ] **Keyboard navigation** - All features work with Tab, Enter, Space, Escape
- [ ] **Focus indicators** - Clear visible outline on focused elements
- [ ] **Alt text** - Images have descriptive alt attributes
- [ ] **Reduced motion** - Respects `prefers-reduced-motion` preference

### Testing Accessibility

1. **Keyboard Testing:**
   - Tab through entire page
   - Enter/Space on buttons
   - Escape to close menus
   - No keyboard traps

2. **Visual Testing:**
   - Check color contrast with tools like WebAIM
   - Verify focus indicators visible
   - Check dark mode appearance

3. **Screen Reader Testing:**
   - Use browser built-in accessibility tree (DevTools → Accessibility tab)
   - Test with actual screen reader if possible

Reference: [docs/accessibility.md](./docs/accessibility.md)

## Asking for Help

### Resources

- **[README.md](./README.md)** - Project overview and quick start
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Development guide with examples
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment instructions
- **[docs/accessibility.md](./docs/accessibility.md)** - Accessibility guidelines
- **[docs/architecture.md](./docs/architecture.md)** - System architecture
- **GitHub Issues** - Report bugs or request features
- **Discussions** - Ask questions

### Creating Issues

When reporting issues or requesting features:

1. **Search existing issues first** - Your issue might already be reported
2. **Use a clear title** - Describe the problem or feature concisely
3. **Include reproduction steps** - How to reproduce the issue
4. **Provide environment info** - OS, browser, device
5. **Add screenshots** - If it's a visual issue

**Example Issue:**
```markdown
## Bug: Mobile menu doesn't close on mobile devices

### Steps to Reproduce
1. Open site on mobile phone
2. Click menu toggle button
3. Click on a navigation link

### Expected Behavior
Menu should close after clicking a link

### Actual Behavior
Menu remains open

### Environment
- Device: iPhone 12
- Browser: Safari 14
- OS: iOS 15
```

---

## Getting Your PR Merged

PRs are typically reviewed within a few days. Maintainers will:

1. Review code style and functionality
2. Test accessibility
3. Verify mobile compatibility
4. Request changes if needed
5. Merge when ready

**Thank you for contributing!** 🎉

Your help makes this project better for everyone.

---

**Version:** Static HTML/CSS/JavaScript  
**No build tools, no dependencies, just plain web standards**
