# Aztec Calendar Wheel Visualization

## Overview

An interactive SVG-based visualization of the Aztec calendar system that renders the tonalpohualli (260-day sacred calendar) and xiuhpohualli (365-day solar calendar) as concentric rings.

## Features

### Visual Design
- **Three Concentric Rings**:
  - **Inner Ring**: 13 tonalpohualli numbers (purple)
  - **Middle Ring**: 20 day signs with glyphs and rainbow colors
  - **Outer Ring**: 18 xiuhpohualli months (earth tones)
- **Aztec-Inspired Color Scheme**: HSL-based color gradients for day signs, with culturally appropriate colors for numbers and months
- **Current Date Highlighting**: Today's date elements have enhanced brightness and glow effects

### Interactions

#### Hover Effects
- Hover over any segment to see a detail panel with:
  - Nahuatl name and English translation
  - Pronunciation guide (for day signs)
  - Symbolic meaning and cultural significance
  - Associated deities and directions
- Smooth transitions with reduced opacity for non-hovered segments

#### Click/Tap Selection
- Click any segment to "pin" the detail panel
- Click the same segment again or use the close button to deselect
- Selected segments maintain highlighting even when mouse moves away

#### Keyboard Navigation
- All segments are focusable with Tab key
- Press Enter or Space to select/deselect segments
- Full keyboard accessibility for detail panel

### Accessibility Features

#### ARIA Support
- Comprehensive `aria-label` attributes on all interactive segments
- `role="button"` on all clickable segments with proper `tabindex`
- `role="tooltip"` and `aria-live="polite"` on detail panel
- Descriptive `role="img"` with full description on SVG element

#### Visual Accessibility
- High contrast colors (WCAG AA compliant)
- Large touch targets for mobile devices
- Clear visual hierarchy with size and color differentiation
- Readable font sizes that scale with viewport

#### Motion Accessibility
- `prefers-reduced-motion` CSS media query support
- Animations reduced to 0.01ms for users with motion sensitivity
- Instant transitions when motion is disabled

### Responsive Design

#### Desktop (≥768px)
- Full-size wheel (up to 800px diameter)
- Side-panel detail display
- All features enabled

#### Mobile (≤767px)
- Automatically scales down to fit viewport
- Touch-friendly interactions
- Maintains readability and usability

#### Dynamic Sizing
- SVG viewport adjusts based on container width
- Text sizes scale proportionally
- Maintains square aspect ratio

## Technical Implementation

### Component Structure

```typescript
AztecCalendarWheel
├── SVG Container (responsive dimensions)
│   ├── Center Circle (sun symbol)
│   ├── Numbers Ring (13 segments)
│   ├── Day Signs Ring (20 segments)
│   └── Months Ring (18 segments)
├── Detail Panel (conditional)
└── Legend (static)
```

### Data Integration

The component integrates with the Aztec calendar system library:

```typescript
import {
  daySigns,              // 20 day signs with full data
  tonalpohualliNumbers,  // 13 numbers with meanings
  xiuhpohualliMonths,    // 18 months with seasons
  useAztecDate,          // Hook for current date
} from "@/lib/aztec-calendar";
```

### State Management

```typescript
const [selectedSegment, setSelectedSegment] = useState<SegmentInfo | null>(null);
const [hoveredSegment, setHoveredSegment] = useState<SegmentInfo | null>(null);
const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
```

### SVG Arc Generation

Custom arc path generation using trigonometry:
- Calculates start/end angles for each segment
- Creates SVG paths with inner and outer radii
- Handles large arc flags for proper rendering

## Testing

### Test Coverage (36 tests, 100% passing)

#### Rendering Tests
- Verifies all 20 day signs are rendered
- Verifies all 13 numbers are rendered
- Verifies all 18 months are rendered
- Checks legend and instructions display
- Validates current date information

#### Interaction Tests
- Hover shows/hides detail panel
- Click selects/deselects segments
- Detail panel persists after click
- Close button functions correctly
- Different segments show different content

#### Keyboard Navigation Tests
- Enter key selects segments
- Space key selects segments
- Tab navigation works through all segments

#### Accessibility Tests
- All segments have ARIA labels
- ARIA live regions for dynamic content
- Proper tab indices
- Screen reader compatible content

#### Responsive Tests
- Window resize handler
- Maintains aspect ratio
- SVG dimensions update correctly

#### Visual Tests
- Aztec-inspired colors applied
- Glyphs rendered for day signs
- Numbers displayed correctly

## Usage

### In a Page Component

```tsx
import AztecCalendarWheel from "./aztec-calendar-wheel";

export default function CalendarPage() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <AztecCalendarWheel />
    </div>
  );
}
```

### Standalone

The component is fully self-contained and can be used anywhere:

```tsx
<AztecCalendarWheel />
```

## Design Decisions

### Why SVG?
- Scalable to any size without quality loss
- Precise mathematical rendering of arcs
- Excellent accessibility support
- Smooth animations and transitions
- Low bundle size

### Why Concentric Rings?
- Visually represents the interconnected cycles
- Traditional calendar wheel representation
- Clear separation of different calendar systems
- Intuitive spatial organization

### Color Choices
- **Purple** for numbers: Sacred, mystical associations
- **Rainbow gradient** for day signs: Diversity and cosmic variety
- **Earth tones** for months: Agricultural and seasonal connection
- **White borders**: Clean separation and clarity

## Performance

- Renders 51 interactive segments (13 + 20 + 18)
- Smooth 60fps animations
- No external dependencies beyond React
- Efficient re-renders using React state
- Memoization opportunities for optimization

## Future Enhancements

Potential improvements for future iterations:

1. **Animation**: Rotating wheel to show current date at top
2. **Zoom**: Ability to zoom into individual rings
3. **History**: Navigate to past/future dates
4. **Export**: Save as PNG or PDF
5. **Themes**: Multiple color schemes (traditional, modern, high-contrast)
6. **Sound**: Optional audio cues for interactions (with user control)
7. **3D Effect**: Subtle depth with shadows and gradients
8. **Multiple Dates**: Compare multiple dates simultaneously

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Credits

- Calendar data from `src/lib/aztec-calendar`
- Design inspired by traditional Aztec calendar stones
- Accessibility guidelines from WCAG 2.1 AA
- Cultural information from academic sources (see calendar library README)
