# Development Guide

Guide for developers contributing to the static site.

## Quick Start

No installation required!

```bash
# Open in browser directly
open index.html

# Or serve locally with Python
python3 -m http.server 8000
# Visit http://localhost:8000
```

## Project Structure

```
.
├── index.html                    # Home page
├── calendar.html                 # Calendar page
├── guide.html                    # Guides page
├── guide-aztec-calendar.html     # Deep dive guide
├── DEPLOYMENT.md                 # Deployment instructions
├── CONTRIBUTING.md               # Contribution guidelines
├── README.md                      # Project overview
├── assets/
│   ├── css/
│   │   └── styles.css           # All styling (design tokens + utilities)
│   ├── images/
│   │   ├── globe.svg
│   │   ├── window.svg
│   │   ├── file.svg
│   │   └── favicon.ico
│   ├── js/
│   │   └── guide-data.js        # Guide data and rendering functions
│   └── data/
│       ├── day-signs.js
│       ├── tonalpohualli-numbers.js
│       └── xiuhpohualli-months.js
├── docs/
│   ├── accessibility.md          # Accessibility guidelines
│   ├── architecture.md           # System architecture
│   ├── deployment.md             # ARCHIVED - Legacy Next.js docs
│   ├── sources.md                # Data sources and attributions
│   └── testing.md                # Testing procedures
└── .gitignore                    # Git ignore patterns
```

## Making Changes

### Editing HTML Pages

1. **Open any `.html` file** in your text editor (VS Code, Sublime, etc.)
2. **Make changes** to content, structure, or links
3. **Save the file**
4. **Refresh your browser** to see updates

HTML files use:
- Semantic HTML (proper heading hierarchy, landmarks)
- Relative paths for all links (`./page.html`, `./assets/css/styles.css`)
- Inline `<script>` tags for JavaScript (no external dependencies)

### Updating Styles

All styling is in `assets/css/styles.css`:

1. **Color variables** - Edit `:root` section to change global colors:
   ```css
   :root {
     --color-primary-500: #2e8a76;  /* Change primary color */
   }
   ```

2. **Add new styles** - Add at the end of the file using CSS custom properties
3. **Responsive design** - Use `clamp()` for fluid sizing:
   ```css
   font-size: clamp(1rem, 2vw, 1.5rem);
   ```

4. **Save and refresh** - Browser refreshes automatically show changes

### Adding JavaScript

JavaScript is embedded directly in HTML `<script>` tags:

1. **Edit the `<script>` section** at bottom of any HTML file
2. **Use vanilla JavaScript** (no frameworks/libraries)
3. **Use semantic variable names** and clear logic
4. **Test interactivity** by refreshing the page

Example pattern used in the site:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Your code here
});
```

### Adding New Pages

1. **Copy an existing HTML file** (e.g., `guide.html`)
2. **Update content** - Change page title, heading, main content
3. **Update navigation** - Add link to new page in `<nav>` section:
   ```html
   <li><a href="./new-page.html">New Page</a></li>
   ```
4. **Link from other pages** - Add the same nav link to all other HTML files
5. **Test all links** - Verify navigation works across all pages

### Adding Images/Assets

1. **Save images** to `assets/images/`
2. **Use SVG format preferred** (scales perfectly, smaller files)
3. **Reference in HTML:**
   ```html
   <img src="./assets/images/filename.svg" alt="Description">
   ```
4. **Update in CSS** as background:
   ```css
   background-image: url('./assets/images/filename.svg');
   ```

## Code Style & Conventions

### HTML
- **Use semantic tags:** `<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`, `<main>`
- **Proper heading hierarchy:** h1 → h2 → h3 (don't skip levels)
- **ARIA attributes** for interactive elements:
  ```html
  <button aria-label="Toggle menu" aria-expanded="false">Menu</button>
  ```
- **Relative paths** for all links:
  ```html
  <a href="./page.html">Link</a>  <!-- ✓ Good -->
  <a href="/page.html">Link</a>    <!-- ✗ Bad -->
  <a href="page.html">Link</a>     <!-- ✗ Bad -->
  ```

### CSS
- **Use custom properties** instead of hardcoding colors/sizes:
  ```css
  color: var(--color-primary-500);     /* ✓ Good */
  color: #2e8a76;                       /* ✗ Avoid -->
  ```
- **Mobile-first approach** - default styles for mobile, then expand:
  ```css
  width: 100%;                          /* Mobile */
  @media (min-width: 768px) {
    width: 50%;                         /* Tablet+ */
  }
  ```
- **Use clamp() for responsive sizes:**
  ```css
  padding: clamp(1rem, 3vw, 2rem);
  ```

### JavaScript
- **Use vanilla JavaScript** (no frameworks, minimal dependencies)
- **DOM queries** - Use semantic selectors:
  ```javascript
  document.querySelector('button[aria-label="Toggle menu"]');
  ```
- **Event listeners** - Always clean up:
  ```javascript
  const handleClick = () => { /* ... */ };
  element.addEventListener('click', handleClick);
  ```
- **Comments** - Only for complex logic, not obvious code

## Testing Changes

Before committing, verify:

1. **Open all HTML pages in browser:**
   - index.html
   - calendar.html
   - guide.html
   - guide-aztec-calendar.html

2. **Check in multiple browsers:**
   - Chrome/Chromium
   - Firefox
   - Safari
   - Edge

3. **Responsive testing:**
   - Resize to mobile (< 768px)
   - Resize to tablet (768px - 1024px)
   - Full desktop (> 1024px)

4. **Keyboard navigation:**
   - Tab through all interactive elements
   - Press Enter/Space on buttons
   - Press Escape to close mobile menu

5. **Browser console (F12):**
   - No red errors
   - No 404s for assets

6. **Mobile testing:**
   - Use Chrome DevTools device emulation
   - Test on actual phone if possible
   - Check touch interactions

## Accessibility Checklist

When making changes, ensure:

- [ ] **Semantic HTML** - Use proper heading hierarchy
- [ ] **ARIA labels** - All interactive elements have descriptive labels
- [ ] **Color contrast** - Text meets WCAG AA standards (4.5:1 for normal text)
- [ ] **Keyboard navigation** - All features work with Tab/Enter/Space
- [ ] **Focus indicators** - Clear visible outline on focus (orange 3px)
- [ ] **Skip links** - Skip to main content link at top of page
- [ ] **Alt text** - All images have descriptive alt attributes
- [ ] **Reduced motion** - Respects `prefers-reduced-motion` preference

Reference: [docs/accessibility.md](./docs/accessibility.md)

## Performance Considerations

- **Keep bundle small** - Aim for < 100KB total
- **Minimize HTTP requests** - Combine CSS, use SVG instead of images
- **Optimize images** - Use SVG for icons, compress PNG/JPG
- **Avoid external scripts** - Only Google Fonts from CDN
- **Inline CSS** if small - Can reduce requests
- **Lazy load** - Only if performance issue

Current size:
- HTML files: ~80KB total
- CSS: ~22KB
- Images: ~27KB

## Git Workflow

1. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** following the code style above

3. **Test thoroughly** using the checklist above

4. **Commit with descriptive messages:**
   ```bash
   git add .
   git commit -m "Add feature: describe what you changed"
   ```

5. **Push and create pull request:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Code review** - Address feedback and iterate

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## Debugging

### Browser DevTools (F12)

- **Console tab** - Check for JavaScript errors
- **Elements tab** - Inspect HTML structure and CSS applied
- **Network tab** - Check if all assets load (no 404s)
- **Responsive Design Mode** - Test mobile/tablet sizes
- **Coverage tab** - Check which CSS/JS is actually used

### Common Issues

**Styles not applying:**
- Check CSS file path is correct (./assets/css/styles.css)
- Verify CSS selector matches HTML element
- Check for CSS specificity conflicts
- Look for typos in class names

**JavaScript not working:**
- Check console for error messages
- Verify DOM elements exist before referencing
- Use `console.log()` to debug values
- Ensure event listeners are attached after DOM loads

**Images not showing:**
- Verify file exists in assets/images/
- Check path is relative (./assets/images/filename.svg)
- Check file name spelling (case-sensitive on Linux)
- Open file directly to check it's valid SVG/PNG

## Design System Reference

### Colors
All colors available as CSS custom properties in `:root`:

- **Primary (Teal):** --color-primary-[50-950]
- **Accent (Orange):** --color-accent-[50-950]
- **Secondary (Pink):** --color-secondary-[50-950]
- **Neutral (Brown):** --color-neutral-[50-950]
- **Night (Dark):** --color-night-[50-950]

Example: `--color-primary-500` = #2e8a76 (main teal)

### Typography
Loaded from Google Fonts:
- **Display:** Playfair Display (serif) - headings
- **Body:** Source Sans 3 (sans-serif) - body text
- **Mono:** IBM Plex Mono (monospace) - code/technical

### Spacing Scale
Responsive using clamp():
- xs: 0.5rem
- sm: 0.75rem
- md: 1rem
- lg: 1.5rem
- xl: 2rem
- 2xl: 3rem

Use with classes like: p-md, m-lg, gap-xl, etc.

## Resources

- [README.md](./README.md) - Project overview
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- [docs/architecture.md](./docs/architecture.md) - System architecture
- [docs/accessibility.md](./docs/accessibility.md) - Accessibility standards
- [DEPLOYMENT.md](./DEPLOYMENT.md) - How to deploy
- [docs/sources.md](./docs/sources.md) - Data sources and credits

## Questions?

Check the docs/ folder for more detailed information or see README.md.

---

**Version:** Static HTML/CSS/JavaScript  
**No build tools required**  
**Edit, save, refresh - that's it!**
