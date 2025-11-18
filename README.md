# Aztec Learning Collective - Static Bundle

A responsive, statically-served learning portal inspired by Aztec artistry. Built as pure HTML, CSS, and JavaScript with no build tools or dependencies required. Ships as a clean, portable static bundle.

## 🚀 Features

- **Pure HTML/CSS/JavaScript** - No build dependencies, no npm required
- **Design System** - Comprehensive CSS variables for colors, typography, spacing, and utilities
- **Responsive Layout** - Mobile-first, accessible across all devices
- **Accessibility First** - WCAG 2.1 AA compliant with keyboard navigation and focus management
- **Sticky Navigation** - Easy access to all sections with active page indicators
- **Semantic HTML** - Proper heading hierarchy, ARIA attributes, and landmarks
- **Dark Mode Support** - Respects system color-scheme preferences
- **Google Fonts Integration** - Playfair Display, Source Sans 3, IBM Plex Mono

## 📋 Project Structure

```
.
├── index.html                    # Home page
├── calendar.html                 # Interactive calendar page
├── guide.html                    # Learning guides page
├── guide-aztec-calendar.html     # Tonalpohualli deep dive
├── assets/
│   ├── css/
│   │   └── styles.css           # Global stylesheet with design tokens
│   ├── images/
│   │   ├── globe.svg
│   │   ├── window.svg
│   │   ├── file.svg
│   │   └── favicon.ico
│   ├── js/                      # Optional: JavaScript modules
│   └── data/                    # Optional: JSON data files
├── docs/                        # Project documentation
└── README.md                    # This file
```

## 🎯 Quick Start

**No installation required!** Simply open `index.html` in your browser:

```bash
# Open directly from filesystem
open index.html

# Or serve locally with Python
python3 -m http.server 8000
# Visit http://localhost:8000
```

## 📄 Pages

- `index.html` - Home page with feature highlights and call-to-action cards
- `calendar.html` - Interactive Aztec calendar placeholder (ready for enhancement)
- `guide.html` - Curated learning guides placeholder (ready for enhancement)
- `guide-aztec-calendar.html` - Deep dive into the tonalpohualli sacred calendar

## 🎨 Design System

### Colors
The `assets/css/styles.css` file includes a comprehensive color system:

- **Primary Palette** - Teal/green theme (#2e8a76 primary-500)
- **Accent Palette** - Orange (#d7721e accent-500)
- **Secondary Palette** - Pink/magenta
- **Neutral Palette** - Browns and earth tones
- **Night Palette** - Dark mode colors

All colors are defined as CSS custom properties and are fully responsive to light/dark mode preferences.

### Typography
- **Display Font** - Playfair Display (serif)
- **Body Font** - Source Sans 3 (sans-serif)
- **Mono Font** - IBM Plex Mono (monospace)

### Spacing Scale
Responsive spacing using clamp() for fluid sizing:
- Section padding: `clamp(3.5rem, 8vw, 6.5rem)`
- Gutter padding: `clamp(1.25rem, 3vw, 2.5rem)`

## 💻 Making Changes

### Editing HTML Pages
1. Open any `.html` file in your text editor
2. Modify content, structure, or links
3. Save the file and refresh your browser

### Updating Styles
All styling is in `assets/css/styles.css`:
- Edit color variables in the `:root` section
- Modify spacing, typography, or layout utilities
- Add new component styles

To change a color globally (e.g., primary-500):
```css
:root {
  --color-primary-500: #2e8a76; /* Change this */
}
```

### Adding Navigation Links
Edit the navigation in the `<header>` of each HTML file. The navigation structure is:
```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="./">Home</a></li>
    <li><a href="./calendar.html">Calendar</a></li>
    <li><a href="./guide.html">Guides</a></li>
  </ul>
</nav>
```

### Mobile Menu
The mobile menu is controlled by JavaScript. It's automatically responsive - desktop shows full navigation, mobile shows a hamburger menu.

## ♿ Accessibility Features

The platform is built with WCAG 2.1 AA compliance in mind:
- **Skip Link**: Jump directly to main content (keyboard accessible)
- **Focus Styles**: Clear 3px orange outline with 3px offset
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Semantic HTML**: Proper heading hierarchy and ARIA attributes
- **Color Contrast**: All text meets AA contrast requirements
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Responsive Text**: Font sizes scale with viewport using clamp()

For detailed accessibility guidance, see [docs/accessibility.md](./docs/accessibility.md)

## 📱 Browser Support

Tested and working on:
- **Chrome/Chromium** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile browsers** - iOS Safari, Chrome Mobile, Firefox Mobile

All pages render correctly when opened directly from the filesystem or served via HTTP.

## 🌐 External Dependencies

This site relies on one external resource via CDN:
- **Google Fonts** (fonts.googleapis.com) - For Playfair Display, Source Sans 3, and IBM Plex Mono typography

**Important:** The site requires an internet connection to load these fonts. If offline, the page will display with fallback system fonts (serif, sans-serif, monospace).

For offline deployments, consider downloading the font files and serving them locally from the `assets/fonts/` directory.

## 🚀 Deployment

This is a **static website** - no build process or server required. All files are ready to deploy as-is.

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for complete deployment instructions covering:
- **FTP/SFTP** - Traditional web hosting
- **GitHub Pages** - Free GitHub hosting
- **Netlify** - Drag-and-drop deployment
- **Other static hosts** - Any HTTP server

Key points:
- **No npm install needed** - this is pure HTML/CSS/JavaScript
- **Directory structure must be preserved** - keep the `assets/` folder in place
- **All files should be uploaded** - including `index.html`, all `.html` files, and the `assets/` directory
- The site works locally by opening `index.html` in a browser

## 📝 File Size

The static bundle is extremely lightweight:
- **Total**: ~85KB (compressed)
- **HTML**: ~80KB total for all 4 pages
- **CSS**: ~22KB (includes design tokens and utilities)
- **Images**: ~27KB (SVGs + favicon)

## 🎯 Getting Started for Developers

1. Clone the repository: `git clone <repo-url>`
2. No dependencies to install!
3. Open `index.html` in your browser or run `python3 -m http.server 8000`
4. Navigate to [http://localhost:8000](http://localhost:8000)
5. Make changes to `.html` files and refresh to see updates
6. Modify colors and styles in `assets/css/styles.css`
7. Add new pages by creating new `.html` files

## 📊 CSS Features

The `assets/css/styles.css` provides:

### Design Tokens
- **60+ Color Variables** - All color shades across 5 palettes
- **Spacing Scale** - From 0 to 6.5rem with responsive clamp()
- **Font Sizes** - From xs (0.75rem) to 5xl (3rem)
- **Border Radius** - From 0 to 9999px (full)
- **Shadows** - From sm to elevation
- **Transitions** - Timing functions and durations

### Utility Classes
- **Layout** - flex, grid, container, min-h-screen, etc.
- **Text** - All font sizes, weights, alignment, transforms
- **Colors** - text-*, bg-*, border-* for all palettes
- **Spacing** - p-*, m-*, gap-*, px-*, py-*, etc.
- **Responsive** - md:*, sm:* prefixes for breakpoints

### Components
- **Cards** - `.card` with hover states
- **Buttons** - `.button-primary`, `.button-secondary`, `.button-tertiary`
- **Badges** - `.badge` for labels and tags
- **Sections** - `.section-hero`, `.section-dark`, `.section-muted`

## 🔧 Configuration Files

- **`.prettierrc`**: Code formatting rules (shared across all formats)
- **`.gitignore`**: Git ignore patterns for OS and IDE files

## 📦 JavaScript

All interactivity is handled by vanilla JavaScript in the HTML `<script>` tags:

- **Mobile Menu Toggle** - Click/keyboard/Escape to open/close
- **Navigation State** - Active page indicators
- **Copyright Year** - Auto-updates current year in footer

The pages are fully functional without JavaScript, with progressive enhancement for mobile menu interactivity.

## 📖 Documentation

Comprehensive documentation is available to help you understand and contribute to this project:

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment guides for FTP, GitHub Pages, Netlify, and other static hosts
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines, development workflow, code style, and best practices
- **[docs/architecture.md](./docs/architecture.md)** - System architecture, design patterns, and component overview
- **[docs/accessibility.md](./docs/accessibility.md)** - Accessibility standards, testing procedures, and WCAG 2.1 compliance guidelines
- **[docs/sources.md](./docs/sources.md)** - Data sources, attributions, licenses, and third-party asset documentation

## 🤝 Contributing

When contributing, please:
1. Read [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines
2. Follow the existing code style and conventions
3. Test changes in Chrome, Firefox, and Safari
4. Ensure accessibility is maintained (keyboard navigation, focus states, color contrast)
5. Keep bundle size minimal - the project should remain under 100KB

## 📞 Support

For issues or questions, please refer to the [documentation](./docs/) or create an issue in the repository.

## 📝 License

This project is provided as-is for educational purposes.
