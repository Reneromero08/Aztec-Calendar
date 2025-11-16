# Accessibility Guidelines

This document covers accessibility standards, testing procedures, and implementation guidelines for this project.

## WCAG 2.1 Compliance

This project aims for **WCAG 2.1 Level AA** compliance as the minimum standard.

### The Four Principles

1. **Perceivable** - Information must be perceivable to all users
2. **Operable** - Navigation and interaction must be possible
3. **Understandable** - Content and controls must be clear
4. **Robust** - Compatible with assistive technologies

## Accessibility Features

### Semantic HTML

- Use proper heading hierarchy (h1 → h2 → h3)
- Use semantic elements (nav, main, section, article)
- Each page has exactly one h1
- Proper list markup (ul, ol, li)

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Tab order is logical and intuitive
- Focus indicators are clearly visible
- No keyboard traps
- Skip links for jumping to main content

### Color and Contrast

- Text meets 4.5:1 contrast ratio (AA standard)
- Color is never the only means of conveying information
- Dark mode support respects user preferences
- Sufficient contrast in focus states

### Motion and Animation

- Animations respect `prefers-reduced-motion`
- No auto-playing videos with sound
- No flickering or flashing content
- Smooth transitions don't distract

### Images and Graphics

- All images have descriptive alt text
- Decorative images use empty alt text
- Charts include text descriptions
- Icons have proper ARIA labels

### Forms

- All form fields have associated labels
- Error messages are clear and accessible
- Required fields are marked
- Help text is properly associated
- Focus is managed after errors

### Dynamic Content

- Live regions announce important updates
- Loading states are clear
- Errors are announced to screen readers
- Content updates don't cause unexpected focus changes

## Testing Procedures

### Manual Testing

#### Keyboard Navigation Test

1. Open the application in a browser
2. Press Tab repeatedly to navigate
3. Verify all interactive elements are reachable
4. Check focus indicators are visible
5. Ensure reading order is logical

#### Screen Reader Testing

**Using NVDA (Windows):**
```bash
# Download: https://www.nvaccess.org/download/

# Start NVDA
# Browse the application
# Verify:
# - Page title is announced
# - Headings are identified
# - Links are descriptive
# - Forms are properly labeled
# - Images have alt text
```

**Using VoiceOver (macOS):**
```bash
# Enable: System Preferences → Accessibility → VoiceOver
# Use Ctrl+Option (VO) + arrow keys to navigate
# Verify same as NVDA
```

#### Color Contrast Test

1. Go to WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
2. Sample colors from the design system
3. Verify contrast ratio ≥ 4.5:1 for body text
4. Verify contrast ratio ≥ 3:1 for large text
5. Test both light and dark modes

#### Responsive Testing

1. Test on various screen sizes (mobile, tablet, desktop)
2. Verify touch targets are ≥ 44x44 pixels
3. Test with browser zoom at 200%
4. Verify content reflows properly
5. Test with different orientations

### Automated Testing

#### Axe DevTools

```bash
# Install Chrome extension
# https://www.deque.com/axe/devtools/

# Run scan:
# 1. Open DevTools → Axe DevTools
# 2. Click "Scan ALL of my page"
# 3. Review violations and fixes
```

#### WAVE

```bash
# Go to https://wave.webaim.org/
# Enter URL or use extension
# Review errors, warnings, and features
```

#### Lighthouse (Chrome)

```bash
# In DevTools:
# 1. Open DevTools (F12)
# 2. Go to "Lighthouse"
# 3. Select "Accessibility"
# 4. Click "Analyze page load"
# 5. Review score and recommendations
```

## Implementation Checklist

Before committing, verify:

- [ ] Page has one h1 heading
- [ ] Heading hierarchy is correct (no skipped levels)
- [ ] All images have alt text
- [ ] Decorative images use empty alt text
- [ ] All links have descriptive text
- [ ] Color contrast is ≥ 4.5:1
- [ ] Focus indicators are visible
- [ ] Keyboard navigation works
- [ ] All forms have labels
- [ ] Error messages are clear
- [ ] Motion animations respect prefers-reduced-motion
- [ ] No content flashes/flickers
- [ ] Touch targets are ≥ 44x44 pixels
- [ ] Page is responsive
- [ ] Screen reader friendly

## Accessibility Features in This Project

### Header Component

- Semantic nav element
- Logo is a link to home
- Keyboard accessible menu
- Skip link to main content
- Responsive hamburger menu

### Calendar Features

- Keyboard navigation between dates
- Screen reader announces selections
- Color coding has text alternatives
- Month/year selector is accessible
- Date lookup form has clear labels

### Guide Pages

- Proper heading hierarchy
- Descriptive links
- Cards are keyboard navigable
- Difficulty indicators have text labels
- Navigation is clear

## Resources

### Learning Resources

- **WebAIM**: https://webaim.org/
- **W3C Accessibility**: https://www.w3.org/WAI/
- **WCAG 2.1 Quick Reference**: https://www.w3.org/WAI/WCAG21/quickref/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **A11y Project**: https://www.a11yproject.com/

### Tools

- **axe DevTools**: https://www.deque.com/axe/devtools/
- **WAVE**: https://wave.webaim.org/
- **NVDA**: https://www.nvaccess.org/
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Color Blindness Simulator**: https://www.color-blindness.com/coblis-color-blindness-simulator/

## Reporting Accessibility Issues

When reporting accessibility issues, include:

1. **Clear description** of the problem
2. **Steps to reproduce** the issue
3. **Expected behavior** vs. actual behavior
4. **Assistive technology** used (if applicable)
5. **Browser and OS** information
6. **WCAG criterion** violated (if known)
7. **Screenshots or video** if helpful

Use the GitHub issue label: `accessibility`

---

For more information, see:
- [CONTRIBUTING.md](../CONTRIBUTING.md)
- [docs/architecture.md](./architecture.md)
- [docs/deployment.md](./deployment.md)
