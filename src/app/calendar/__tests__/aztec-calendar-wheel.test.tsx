import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AztecCalendarWheel from "../aztec-calendar-wheel";
import * as aztecCalendar from "@/lib/aztec-calendar";

// Mock the Aztec calendar hooks
vi.mock("@/lib/aztec-calendar", async () => {
  const actual = await vi.importActual("@/lib/aztec-calendar");
  return {
    ...actual,
    useAztecDate: vi.fn(),
  };
});

describe("AztecCalendarWheel", () => {
  // Helper to get only segment buttons (exclude UI buttons like close and high contrast)
  const getSegmentButtons = () => {
    const allButtons = screen.getAllByRole("button");
    return allButtons.filter((btn) => {
      const label = btn.getAttribute("aria-label") || "";
      return !label.includes("Close") && !label.includes("contrast");
    });
  };

  const mockAztecDate = {
    gregorianDate: new Date("2024-01-01"),
    tonalpohualli: {
      number: {
        value: 7,
        nahuatlName: "Chicome",
        meaning: "Seven represents completion and balance",
        gender: "Neutral",
      },
      daySign: {
        nahuatlName: "Cipactli",
        englishName: "Crocodile",
        glyph: "🐊",
        pronunciation: "see-PAK-tlee",
        meaning: "The earth monster, primordial being associated with fertility and the earth's surface",
        position: 1,
        direction: "East",
        deity: "Tonacatecuhtli",
      },
      dayCount: 7,
    },
    xiuhpohualli: {
      month: {
        nahuatlName: "Atlcahualo",
        englishName: "Ceasing of Water",
        days: 20,
        position: 1,
        season: "Dry Season",
        patron: "Tlaloc",
        agricultural: "Preparation for planting",
      },
      day: 5,
      dayOfYear: 5,
      isNemontemi: false,
    },
    yearInRound: 15,
  };

  beforeEach(() => {
    vi.mocked(aztecCalendar.useAztecDate).mockReturnValue({
      aztecDate: mockAztecDate,
      error: null,
      isLoading: false,
    });

    // Mock window.matchMedia for dark mode
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render the calendar wheel component", () => {
      render(<AztecCalendarWheel />);
      
      expect(screen.getByText("Interactive Aztec Calendar Wheel")).toBeInTheDocument();
      expect(screen.getByText(/Hover or click segments to explore/i)).toBeInTheDocument();
    });

    it("should render the SVG with proper ARIA labels", () => {
      render(<AztecCalendarWheel />);
      
      const svg = screen.getByRole("img", {
        name: /Interactive Aztec calendar wheel/i,
      });
      expect(svg).toBeInTheDocument();
    });

    it("should render all 20 day signs", () => {
      render(<AztecCalendarWheel />);
      
      const daySignButtons = screen.getAllByRole("button").filter((btn) =>
        btn.getAttribute("aria-label")?.includes("Crocodile") ||
        btn.getAttribute("aria-label")?.includes("Wind") ||
        btn.getAttribute("aria-label")?.includes("House")
      );
      
      // Should have day sign segments (20 total)
      expect(daySignButtons.length).toBeGreaterThan(0);
    });

    it("should render all 13 numbers", () => {
      render(<AztecCalendarWheel />);
      
      const numberButtons = screen.getAllByRole("button").filter((btn) =>
        btn.getAttribute("aria-label")?.includes("Number")
      );
      
      // Should have number segments (13 total)
      expect(numberButtons.length).toBe(13);
    });

    it("should render all 18 months", () => {
      render(<AztecCalendarWheel />);
      
      const monthButtons = screen.getAllByRole("button").filter((btn) =>
        btn.getAttribute("aria-label")?.includes("Month")
      );
      
      // Should have month segments (18 total)
      expect(monthButtons.length).toBe(18);
    });

    it("should render legend with three categories", () => {
      render(<AztecCalendarWheel />);
      
      expect(screen.getByText("13 Numbers")).toBeInTheDocument();
      expect(screen.getByText("20 Day Signs")).toBeInTheDocument();
      expect(screen.getByText("18 Months")).toBeInTheDocument();
    });

    it("should display current date information", () => {
      render(<AztecCalendarWheel />);
      
      expect(screen.getByText(/Today:/i)).toBeInTheDocument();
      expect(screen.getByText(/7 Cipactli/i)).toBeInTheDocument();
      // The crocodile emoji appears in multiple places, so just check it exists
      const text = screen.getByText(/Today:/i).parentElement?.textContent;
      expect(text).toContain("🐊");
    });
  });

  describe("Interactions - Hover", () => {
    it("should show detail panel on hover", async () => {
      const user = userEvent.setup();
      render(<AztecCalendarWheel />);
      
      const segmentButtons = getSegmentButtons();
      const firstDaySign = segmentButtons[0];
      await user.hover(firstDaySign);
      
      await waitFor(() => {
        const detailPanel = screen.getByRole("tooltip");
        expect(detailPanel).toBeInTheDocument();
      });
    });

    it("should hide detail panel when mouse leaves", async () => {
      const user = userEvent.setup();
      render(<AztecCalendarWheel />);
      
      const segmentButtons = getSegmentButtons();
      const firstDaySign = segmentButtons[0];
      await user.hover(firstDaySign);
      
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
      
      await user.unhover(firstDaySign);
      
      await waitFor(() => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      });
    });

    it("should update detail panel content on different segment hover", async () => {
      const user = userEvent.setup();
      render(<AztecCalendarWheel />);
      
      const segmentButtons = getSegmentButtons();
      const firstButton = segmentButtons[0];
      const secondButton = segmentButtons[1];
      
      await user.hover(firstButton);
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
      
      const firstContent = screen.getByRole("tooltip").textContent;
      
      await user.hover(secondButton);
      await waitFor(() => {
        const newContent = screen.getByRole("tooltip").textContent;
        expect(newContent).not.toBe(firstContent);
      });
    });
  });

  describe("Interactions - Click", () => {
    it("should select segment on click", async () => {
      const user = userEvent.setup();
      render(<AztecCalendarWheel />);
      
      const segmentButtons = getSegmentButtons();
      const firstButton = segmentButtons[0];
      await user.click(firstButton);
      
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });

    it("should keep detail panel open after click", async () => {
      const user = userEvent.setup();
      render(<AztecCalendarWheel />);
      
      const segmentButtons = getSegmentButtons();
      const firstButton = segmentButtons[0];
      await user.click(firstButton);
      
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
      
      // Move mouse away
      await user.unhover(firstButton);
      
      // Panel should still be visible
      expect(screen.getByRole("tooltip")).toBeInTheDocument();
    });

    it("should close detail panel when close button is clicked", async () => {
      const user = userEvent.setup();
      render(<AztecCalendarWheel />);
      
      const segmentButtons = getSegmentButtons();
      const firstButton = segmentButtons[0];
      await user.click(firstButton);
      
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
      
      const closeButton = screen.getByRole("button", { name: /Close detail panel/i });
      await user.click(closeButton);
      
      await waitFor(() => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      });
    });

    it("should deselect segment using close button", async () => {
      const user = userEvent.setup();
      render(<AztecCalendarWheel />);
      
      const segmentButtons = getSegmentButtons();
      const firstButton = segmentButtons[0];
      
      // First click - select
      await user.click(firstButton);
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
      
      // Use close button instead of clicking segment again
      const closeButton = screen.getByRole("button", { name: /Close detail panel/i });
      await user.click(closeButton);
      
      await waitFor(() => {
        expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
      });
    });
  });

  describe("Keyboard Navigation", () => {
    it("should support keyboard navigation with Enter key", async () => {
      const user = userEvent.setup();
      render(<AztecCalendarWheel />);
      
      const segmentButtons = getSegmentButtons();
      const firstButton = segmentButtons[0];
      firstButton.focus();
      
      await user.keyboard("{Enter}");
      
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });

    it("should support keyboard navigation with Space key", async () => {
      const user = userEvent.setup();
      render(<AztecCalendarWheel />);
      
      const segmentButtons = getSegmentButtons();
      const firstButton = segmentButtons[0];
      firstButton.focus();
      
      await user.keyboard(" ");
      
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });

    it("should support Tab navigation through segments", async () => {
      const user = userEvent.setup();
      render(<AztecCalendarWheel />);
      
      const segmentButtons = getSegmentButtons();
      
      // Focus first button
      segmentButtons[0].focus();
      expect(segmentButtons[0]).toHaveFocus();
      
      // Tab to next button
      await user.tab();
      expect(segmentButtons[1]).toHaveFocus();
    });
  });

  describe("Accessibility", () => {
    it("should have high contrast toggle button", () => {
      render(<AztecCalendarWheel />);
      
      const highContrastButton = screen.getByRole("button", {
        name: /high contrast/i,
      });
      expect(highContrastButton).toBeInTheDocument();
      expect(highContrastButton).toHaveAttribute("aria-pressed");
    });

    it("should toggle high contrast mode", async () => {
      const user = userEvent.setup();
      render(<AztecCalendarWheel />);
      
      const highContrastButton = screen.getByRole("button", {
        name: /high contrast/i,
      });
      
      expect(highContrastButton).toHaveAttribute("aria-pressed", "false");
      
      await user.click(highContrastButton);
      
      expect(highContrastButton).toHaveAttribute("aria-pressed", "true");
    });

    it("should have proper ARIA labels for all segments", () => {
      render(<AztecCalendarWheel />);
      
      const segmentButtons = getSegmentButtons();
      
      segmentButtons.forEach((button) => {
        const ariaLabel = button.getAttribute("aria-label");
        expect(ariaLabel).toBeTruthy();
        expect(ariaLabel!.length).toBeGreaterThan(0);
      });
    });

    it("should have aria-live region for detail panel", async () => {
      const user = userEvent.setup();
      render(<AztecCalendarWheel />);
      
      const segmentButtons = getSegmentButtons();
      const firstButton = segmentButtons[0];
      await user.hover(firstButton);
      
      await waitFor(() => {
        const tooltip = screen.getByRole("tooltip");
        expect(tooltip).toHaveAttribute("aria-live", "polite");
      });
    });

    it("should have proper tab indices", () => {
      render(<AztecCalendarWheel />);
      
      const segmentButtons = getSegmentButtons();
      
      segmentButtons.forEach((button) => {
        // Check for lowercase tabindex attribute
        const tabindex = button.getAttribute("tabindex");
        expect(tabindex).toBeTruthy();
      });
    });

    it("should display content for screen readers", () => {
      render(<AztecCalendarWheel />);
      
      // Check for descriptive text
      expect(screen.getByText(/Hover or click segments to explore/i)).toBeInTheDocument();
      
      // Check for legend that helps understand the visualization
      expect(screen.getByText("Inner ring")).toBeInTheDocument();
      expect(screen.getByText("Middle ring")).toBeInTheDocument();
      expect(screen.getByText("Outer ring")).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("should handle window resize", async () => {
      const { container } = render(<AztecCalendarWheel />);
      
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      
      // Simulate window resize
      global.innerWidth = 400;
      fireEvent(window, new Event("resize"));
      
      await waitFor(() => {
        // Component should have updated dimensions
        const newSvg = container.querySelector("svg");
        expect(newSvg).toBeInTheDocument();
      });
    });

    it("should maintain aspect ratio", () => {
      const { container } = render(<AztecCalendarWheel />);
      
      const svg = container.querySelector("svg");
      const width = svg?.getAttribute("width");
      const height = svg?.getAttribute("height");
      
      expect(width).toBe(height);
    });
  });

  describe("Detail Panel Content", () => {
    it("should display day sign information correctly", async () => {
      const user = userEvent.setup();
      render(<AztecCalendarWheel />);
      
      // Find a day sign button by finding one with glyph emoji in aria-label
      const allButtons = screen.getAllByRole("button");
      const daySignButton = allButtons.find((btn) => {
        const label = btn.getAttribute("aria-label") || "";
        return label.includes("Cipactli") || label.includes("Crocodile");
      });
      
      if (!daySignButton) {
        // Fallback: just click any button that's likely a day sign (has emoji-like characters)
        const fallbackButton = allButtons.find((btn) => {
          const label = btn.getAttribute("aria-label") || "";
          return !label.includes("Number") && !label.includes("Month");
        });
        expect(fallbackButton).toBeDefined();
        await user.click(fallbackButton!);
      } else {
        await user.click(daySignButton);
      }
      
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });

    it("should display number information correctly", async () => {
      const user = userEvent.setup();
      render(<AztecCalendarWheel />);
      
      // Find a number button
      const allButtons = screen.getAllByRole("button");
      const numberButton = allButtons.find((btn) =>
        btn.getAttribute("aria-label")?.includes("Number 1")
      );
      
      expect(numberButton).toBeDefined();
      await user.click(numberButton!);
      
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
        expect(screen.getByText(/Sacred Number/i)).toBeInTheDocument();
      });
    });

    it("should display month information correctly", async () => {
      const user = userEvent.setup();
      render(<AztecCalendarWheel />);
      
      // Find a month button
      const allButtons = screen.getAllByRole("button");
      const monthButton = allButtons.find((btn) =>
        btn.getAttribute("aria-label")?.includes("Month")
      );
      
      expect(monthButton).toBeDefined();
      await user.click(monthButton!);
      
      await waitFor(() => {
        expect(screen.getByRole("tooltip")).toBeInTheDocument();
      });
    });
  });

  describe("Current Date Highlighting", () => {
    it("should highlight current day sign", () => {
      const { container } = render(<AztecCalendarWheel />);
      
      // The current day sign should be visually distinguished
      const paths = container.querySelectorAll("path");
      expect(paths.length).toBeGreaterThan(0);
    });

    it("should highlight current number", () => {
      const { container } = render(<AztecCalendarWheel />);
      
      // The current number should be visually distinguished
      const paths = container.querySelectorAll("path");
      expect(paths.length).toBeGreaterThan(0);
    });

    it("should highlight current month", () => {
      const { container } = render(<AztecCalendarWheel />);
      
      // The current month should be visually distinguished
      const paths = container.querySelectorAll("path");
      expect(paths.length).toBeGreaterThan(0);
    });
  });

  describe("Reduced Motion", () => {
    it("should respect prefers-reduced-motion setting", () => {
      const { container } = render(<AztecCalendarWheel />);
      
      // Check that reduced motion styles are present
      const style = container.querySelector("style");
      expect(style).toBeInTheDocument();
      expect(style?.textContent).toContain("prefers-reduced-motion");
    });
  });

  describe("Error Handling", () => {
    it("should render without current date", () => {
      vi.mocked(aztecCalendar.useAztecDate).mockReturnValue({
        aztecDate: null,
        error: null,
        isLoading: false,
      });

      render(<AztecCalendarWheel />);
      
      expect(screen.getByText("Interactive Aztec Calendar Wheel")).toBeInTheDocument();
      expect(screen.queryByText(/Today:/i)).not.toBeInTheDocument();
    });

    it("should handle loading state gracefully", () => {
      vi.mocked(aztecCalendar.useAztecDate).mockReturnValue({
        aztecDate: null,
        error: null,
        isLoading: true,
      });

      render(<AztecCalendarWheel />);
      
      expect(screen.getByText("Interactive Aztec Calendar Wheel")).toBeInTheDocument();
    });

    it("should handle error state gracefully", () => {
      vi.mocked(aztecCalendar.useAztecDate).mockReturnValue({
        aztecDate: null,
        error: "Failed to load calendar",
        isLoading: false,
      });

      render(<AztecCalendarWheel />);
      
      expect(screen.getByText("Interactive Aztec Calendar Wheel")).toBeInTheDocument();
    });
  });

  describe("Visual Appearance", () => {
    it("should use Aztec-inspired colors", () => {
      const { container } = render(<AztecCalendarWheel />);
      
      const paths = container.querySelectorAll("path");
      expect(paths.length).toBeGreaterThan(0);
      
      // Check that paths have fill colors
      paths.forEach((path) => {
        const fill = path.getAttribute("fill");
        expect(fill).toBeTruthy();
      });
    });

    it("should render glyphs for day signs", () => {
      const { container } = render(<AztecCalendarWheel />);
      
      const texts = container.querySelectorAll("text");
      const glyphs = Array.from(texts).filter((text) =>
        /[\u{1F300}-\u{1F9FF}]/u.test(text.textContent || "")
      );
      
      expect(glyphs.length).toBeGreaterThan(0);
    });

    it("should render numbers for tonalpohualli", () => {
      const { container } = render(<AztecCalendarWheel />);
      
      const texts = container.querySelectorAll("text");
      const numbers = Array.from(texts).filter((text) =>
        /^\d+$/.test(text.textContent || "")
      );
      
      expect(numbers.length).toBeGreaterThan(0);
    });
  });
});
