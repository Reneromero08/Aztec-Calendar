# Guide System Documentation

## Overview

The guide system provides structured educational content for the Aztec calendar, with modular components, deep linking, and full accessibility support. Content can be created using both TypeScript/React components and MDX files.

## Architecture

### Content Creation Methods

1. **React Components** (Primary)
   - Full TypeScript support with type safety
   - Direct access to Aztec calendar data
   - Located in: `src/app/guide/[guide-name]/page.tsx`
   - Example: `src/app/guide/aztec-calendar/page.tsx`

2. **MDX Files** (Alternative)
   - Markdown with JSX component embedding
   - Located in: `src/content/guides/`
   - Example: `src/content/guides/aztec-calendar-guide.mdx`
   - Supports importing and using React components

### Core Components

#### GuideLayout
**Location**: `src/components/guide/GuideLayout.tsx`

The main layout wrapper for all guide pages, providing:
- Consistent header with back navigation
- Sidebar table of contents (TOC)
- Responsive grid layout
- Semantic HTML structure

**Props**:
```typescript
interface GuideLayoutProps {
  title: string;           // Main guide title
  intro?: string;          // Optional introductory text
  sections: GuideSection[]; // TOC sections
  children: ReactNode;      // Guide content
}

interface GuideSection {
  id: string;              // Anchor ID for deep linking
  title: string;           // Section title
  description?: string;    // Optional description
}
```

**Usage**:
```tsx
<GuideLayout
  title="Your Guide Title"
  intro="Brief introduction"
  sections={tocSections}
>
  {/* Guide content */}
</GuideLayout>
```

#### DaySignCard
**Location**: `src/components/guide/DaySignCard.tsx`

Displays a single Aztec day sign with all associated information.

**Props**:
```typescript
interface DaySignCardProps {
  daySign: DaySign;        // From @/lib/aztec-calendar
  showDetailLink?: boolean; // Show/hide "View details" link
}
```

**Features**:
- Displays glyph, Nahuatl name, English name
- Shows symbolic associations (direction, deity)
- Deep linkable with id="day-sign-{position}"
- Optional detail link for navigation
- Full accessibility with ARIA labels

#### NumberCard
**Location**: `src/components/guide/NumberCard.tsx`

Displays a tonalpohualli number (1-13) with meaning and energy.

**Props**:
```typescript
interface NumberCardProps {
  number: TonalpohualliNumber; // From @/lib/aztec-calendar
  showDetailLink?: boolean;     // Show/hide detail link
}
```

**Features**:
- Shows number, Nahuatl name, meaning
- Displays gender association (masculine/feminine)
- Deep linkable with id="number-{value}"

#### MonthCard
**Location**: `src/components/guide/MonthCard.tsx`

Displays a xiuhpohualli month with agricultural and seasonal context.

**Props**:
```typescript
interface MonthCardProps {
  month: XiuhpohualliMonth; // From @/lib/aztec-calendar
}
```

**Features**:
- Shows Nahuatl and English names
- Agricultural significance
- Season and patron deity
- Deep linkable with id="month-{position}"

#### GlyphPlaceholder
**Location**: `src/components/guide/GlyphPlaceholder.tsx`

Placeholder component for imagery/glyphs that will be added later.

**Props**:
```typescript
interface GlyphPlaceholderProps {
  label: string;       // Short label (2 chars used for icon)
  description: string; // Description displayed below
}
```

## Deep Linking

All calendar entity cards include semantic ID attributes for deep linking:

- Day Signs: `#day-sign-{1-20}`
- Numbers: `#number-{1-13}`
- Months: `#month-{1-18}`
- Guide Sections: `#{section-id}` (defined in GuideLayout sections)

Example URL: `/guide/aztec-calendar#day-sign-5` (jumps to Serpent day sign)

## Accessibility Features

### Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3 → h4)
- `<article>`, `<section>`, `<header>`, `<footer>` landmarks
- `<nav>` with aria-label for TOC

### ARIA Support
- `aria-labelledby` for section associations
- `aria-label` for navigation regions
- Descriptive link text (no "click here")
- Screen reader friendly card structure

### Keyboard Navigation
- All links and buttons keyboard accessible
- Logical tab order
- Skip links for main content

### Visual Design
- High contrast text on backgrounds
- Consistent color coding (day signs: accent, numbers: primary, months: emerald)
- Readable typography with proper line height
- Responsive layout for all screen sizes

## Content Authoring Workflow

### Adding a New Guide

1. **Create the guide page**:
   ```bash
   touch src/app/guide/[guide-name]/page.tsx
   ```

2. **Define metadata and sections**:
   ```tsx
   export const metadata = {
     title: "Your Guide Title - Educational Platform",
     description: "SEO-friendly description",
   };

   const sections: GuideSection[] = [
     { id: "intro", title: "Introduction" },
     // ... more sections
   ];
   ```

3. **Build content using components**:
   ```tsx
   export default function YourGuidePage() {
     return (
       <GuideLayout title="..." sections={sections}>
         <section id="intro">
           <h2>Introduction</h2>
           <p>Content here...</p>
         </section>
         {/* More sections */}
       </GuideLayout>
     );
   }
   ```

4. **Link from main guide page**:
   Update `src/app/guide/page.tsx` to add link to new guide.

### Using MDX (Alternative)

1. **Create MDX file**:
   ```bash
   touch src/content/guides/your-guide.mdx
   ```

2. **Add metadata and content**:
   ```mdx
   export const guideMeta = {
     title: "Your Guide",
     sections: [...],
   };

   # Your Guide Title

   Content with **markdown** and <Component /> usage.
   ```

3. **Import in page component**:
   ```tsx
   import YourGuide from "@/content/guides/your-guide.mdx";
   ```

## Styling Conventions

### Tailwind Classes
- Primary colors for numbers and main actions
- Accent colors for day signs and secondary elements
- Emerald colors for months and growth themes
- Amber colors for warnings/cultural notes
- Consistent padding: `p-6` for cards, `p-4` for nested content

### Typography
- Headings: `font-bold`, appropriate sizes
- Body: `text-gray-700 dark:text-gray-300`
- Links: `text-primary-600 hover:text-primary-800`
- Emphasis: `font-semibold` or `<strong>`

### Spacing
- Section spacing: `mt-12` between major sections
- Card spacing: `space-y-6` for vertical stacks
- Grid gaps: `gap-6` or `gap-4`

## Integration with Aztec Calendar System

The guide system is tightly integrated with the Aztec calendar library:

```tsx
import {
  daySigns,
  tonalpohualliNumbers,
  xiuhpohualliMonths,
  type DaySign,
  type TonalpohualliNumber,
  type XiuhpohualliMonth,
} from "@/lib/aztec-calendar";
```

All data is type-safe and comes from the authoritative calendar implementation.

## Testing

### Component Tests
- Located in `__tests__` directories
- Use React Testing Library
- Focus on semantic queries (getByRole, getByLabelText)

### Example Test Pattern
```tsx
import { render, screen } from "@testing-library/react";

it("renders day sign with accessible content", () => {
  render(<DaySignCard daySign={mockDaySign} />);
  expect(screen.getByRole("heading", { name: /Cipactli/ })).toBeTruthy();
  expect(screen.getByText("Crocodile")).toBeTruthy();
});
```

## Future Enhancements

### Planned Features
- [ ] Interactive glossary with tooltips
- [ ] User bookmarking of favorite sections
- [ ] Print-friendly CSS
- [ ] Multi-language support (English/Nahuatl toggle)
- [ ] Embedded audio pronunciations
- [ ] Integration with calendar wheel for visual references

### Content Expansions
- [ ] Historical context guide
- [ ] Deity pantheon reference
- [ ] Codex image gallery
- [ ] Ceremony and ritual guide
- [ ] Modern interpretations and usage

## MDX Configuration

MDX support is configured in `next.config.ts`:

```typescript
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
```

Custom MDX components are defined in `mdx-components.tsx` at the project root.

## Performance Considerations

- All guide pages are statically generated at build time
- Component tree is optimized for minimal re-renders
- Images/glyphs use placeholders until actual assets are provided
- Calendar data is loaded once and reused across components

## Maintenance

### Updating Content
1. Edit the relevant page.tsx or .mdx file
2. Run `npm run build` to verify changes
3. Run `npm run test:run` to ensure tests pass
4. Commit changes with descriptive message

### Adding Calendar Data
Calendar data should be updated in `src/lib/aztec-calendar/` first, then automatically flows into guide components.

## Resources

- [Next.js MDX Documentation](https://nextjs.org/docs/app/building-your-application/configuring/mdx)
- [React Testing Library](https://testing-library.com/react)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Aztec Calendar Library README](./src/lib/aztec-calendar/README.md)
