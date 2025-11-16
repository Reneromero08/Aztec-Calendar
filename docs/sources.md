# Data Sources and Attribution

This document provides comprehensive attribution and licensing information for all external resources, assets, and data sources used in this project.

## Project Attribution

### Educational Platform

This is an educational project inspired by and built with the following technologies and design principles.

## Technologies Used

### Core Framework

- **Next.js 14**
  - Source: https://nextjs.org/
  - License: MIT
  - Author: Vercel
  - Usage: React framework with App Router

- **React 19**
  - Source: https://react.dev/
  - License: MIT
  - Author: Meta Platforms, Inc.
  - Usage: UI library

- **TypeScript**
  - Source: https://www.typescriptlang.org/
  - License: Apache 2.0
  - Author: Microsoft
  - Usage: Static type checking for JavaScript

### Styling

- **Tailwind CSS 4**
  - Source: https://tailwindcss.com/
  - License: MIT
  - Author: Tailwind Labs
  - Usage: Utility-first CSS framework

- **PostCSS**
  - Source: https://postcss.org/
  - License: MIT
  - Usage: CSS processing and transformations

### Testing

- **Vitest**
  - Source: https://vitest.dev/
  - License: MIT
  - Usage: Unit test runner

- **React Testing Library**
  - Source: https://testing-library.com/react
  - License: MIT
  - Usage: Component testing utilities

- **jsdom**
  - Source: https://github.com/jsdom/jsdom
  - License: MIT
  - Usage: DOM simulation for tests

### Development Tools

- **ESLint**
  - Source: https://eslint.org/
  - License: MIT
  - Usage: Code linting and quality

- **Prettier**
  - Source: https://prettier.io/
  - License: MIT
  - Usage: Code formatting

## Design and Inspiration

### Calendar System

This project implements calculations and visualizations based on the Aztec calendar system. The educational content is inspired by:

- Historical Aztec/Nahua cultural research
- Mesoamerican calendar studies
- Academic sources on indigenous calendars

### Color Design System

- **Primary Colors**: Sky blue palette
- **Accent Colors**: Purple palette
- **Neutral Colors**: Gray scale
- **Night Mode**: Dark color scheme

Customizable via `tailwind.config.ts` and CSS custom properties.

### Responsive Design

Based on modern responsive web design principles:
- Mobile-first approach
- Flexible layouts
- Responsive typography
- Touch-friendly interaction targets (≥44x44 pixels)

## Third-Party Fonts

### Google Fonts

All fonts used are open-source from Google Fonts:

1. **Source Sans 3**
   - Type: Sans-serif
   - Author: Frank Grießhammer
   - License: SIL Open Font License (OFL)
   - URL: https://fonts.google.com/specimen/Source+Sans+3
   - Usage: Body text and UI elements

2. **Playfair Display**
   - Type: Serif display font
   - Author: Claus Willig
   - License: SIL Open Font License (OFL)
   - URL: https://fonts.google.com/specimen/Playfair+Display
   - Usage: Headings and display text

3. **IBM Plex Mono**
   - Type: Monospace
   - Author: IBM
   - License: SIL Open Font License (OFL)
   - URL: https://fonts.google.com/specimen/IBM+Plex+Mono
   - Usage: Code and technical text

## Icons

If icons are used, they should come from open-source icon libraries:

### Recommended Icon Sources

- **Feather Icons**
  - Source: https://feathericons.com/
  - License: MIT
  - Attribution: Not required but appreciated

- **Font Awesome**
  - Source: https://fontawesome.com/
  - License: CC BY 4.0 (free icons)
  - Attribution: Required for free version

- **Material Icons**
  - Source: https://fonts.google.com/icons
  - License: Apache 2.0
  - Attribution: Not required

## Images and Graphics

### Placeholder Images

If using placeholder images for development:

- **Unsplash**: https://unsplash.com/ (Free)
- **Pexels**: https://www.pexels.com/ (Free)
- **Pixabay**: https://pixabay.com/ (Free)

## Documentation References

### Accessibility Standards

- **WCAG 2.1**: Web Content Accessibility Guidelines
  - Source: https://www.w3.org/WAI/WCAG21/quickref/
  - License: W3C Document License
  - Used for: Accessibility compliance guidelines

- **WebAIM**: Web Accessibility In Mind
  - Source: https://webaim.org/
  - License: Open resources
  - Used for: Testing and implementation guidance

### Development Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **React Documentation**: https://react.dev/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **MDN Web Docs**: https://developer.mozilla.org/

## License and Compliance

### This Project License

This project is provided as-is for educational purposes.

### License Compatibility

- MIT License: Permissive, commercial use allowed
- Apache 2.0: Permissive with patent protection
- SIL OFL: Permissive for fonts, derivative fonts allowed
- CC BY 4.0: Requires attribution

All dependencies use compatible, permissive licenses. See `package.json` and `package-lock.json` for complete dependency information.

## Citation Guide

### How to Cite This Project

If you use this project as a reference or inspiration:

```
Educational Platform
Source: [Your GitHub Repository URL]
License: [License Type]
Accessed: [Date]
```

### How to Cite Dependencies

Include a list of major dependencies:

```
Built with:
- Next.js 14 (MIT License)
- React 19 (MIT License)
- TypeScript (Apache 2.0 License)
- Tailwind CSS (MIT License)
- Vitest (MIT License)
```

## Contributing and Attribution

### Contributing to This Project

When contributing, ensure:

1. **Respect existing attributions**
2. **Document new external resources**
3. **Use compatible licenses only**
4. **Cite sources in code comments** where appropriate
5. **Update this file** when adding new dependencies

### Contributor Attribution

Contributors are credited in:
- `package.json` (via git history)
- GitHub commit history
- Project README (if applicable)

## Changelog and Updates

This sources document should be updated when:

- New external packages are added
- Existing packages are removed or updated
- New resources or references are used
- License changes occur

---

## Complete Dependency List

See `package.json` for the complete list of all dependencies and their versions. Each dependency is governed by its own license as specified in its repository or documentation.

For license information on any dependency:

```bash
npm license report
```

---

For more information, see:
- [CONTRIBUTING.md](../CONTRIBUTING.md)
- [docs/architecture.md](./architecture.md)
- [docs/deployment.md](./deployment.md)
