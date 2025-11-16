import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DateLookupForm from "../DateLookupForm";
import type { AztecDate } from "@/lib/aztec-calendar";

describe("DateLookupForm", () => {
  const mockAztecDate: AztecDate = {
    gregorianDate: new Date("2024-01-15"),
    tonalpohualli: {
      number: {
        value: 7,
        nahuatlName: "Chicome",
        meaning: "Seven represents completion",
        gender: "Neutral",
      },
      daySign: {
        nahuatlName: "Cipactli",
        englishName: "Crocodile",
        glyph: "🐊",
        pronunciation: "see-PAK-tlee",
        meaning: "Earth monster",
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

  const defaultProps = {
    selectedDate: new Date("2024-01-15"),
    aztecDate: mockAztecDate,
    error: null,
    onDateChange: vi.fn(),
    onValidationError: vi.fn(),
  };

  it("should render the date input form", () => {
    render(<DateLookupForm {...defaultProps} />);
    
    expect(screen.getByRole("heading", { name: /date lookup/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/select date/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /today/i })).toBeInTheDocument();
  });

  it("should display Aztec date conversion results", () => {
    render(<DateLookupForm {...defaultProps} />);
    
    expect(screen.getByText(/7 Cipactli/i)).toBeInTheDocument();
    expect(screen.getByText(/Crocodile/i)).toBeInTheDocument();
    expect(screen.getByText(/Atlcahualo/i)).toBeInTheDocument();
  });

  it("should call onDateChange when date input changes", async () => {
    const user = userEvent.setup();
    render(<DateLookupForm {...defaultProps} />);
    
    const dateInput = screen.getByLabelText(/select date/i);
    await user.clear(dateInput);
    await user.type(dateInput, "2024-03-15");
    
    await waitFor(() => {
      expect(defaultProps.onDateChange).toHaveBeenCalled();
    });
  });

  it("should call onDateChange when Today button is clicked", async () => {
    const user = userEvent.setup();
    const onDateChange = vi.fn();
    render(<DateLookupForm {...defaultProps} onDateChange={onDateChange} />);
    
    const todayButton = screen.getByRole("button", { name: /today/i });
    await user.click(todayButton);
    
    expect(onDateChange).toHaveBeenCalled();
  });

  it("should display validation error when provided", () => {
    render(<DateLookupForm {...defaultProps} error="Invalid date" />);
    
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid date");
  });

  it("should not display Aztec date when error exists", () => {
    render(<DateLookupForm {...defaultProps} error="Invalid date" aztecDate={null} />);
    
    expect(screen.queryByText(/Cipactli/i)).not.toBeInTheDocument();
  });

  it("should display tonalpohualli information correctly", () => {
    render(<DateLookupForm {...defaultProps} />);
    
    expect(screen.getByText(/tonalpohualli/i)).toBeInTheDocument();
    expect(screen.getByText(/260-day sacred calendar/i)).toBeInTheDocument();
    expect(screen.getByText(/7 of 260/i)).toBeInTheDocument();
  });

  it("should display xiuhpohualli information correctly", () => {
    render(<DateLookupForm {...defaultProps} />);
    
    expect(screen.getByText(/xiuhpohualli/i)).toBeInTheDocument();
    expect(screen.getByText(/365-day solar calendar/i)).toBeInTheDocument();
    expect(screen.getByText(/5 of 365/i)).toBeInTheDocument();
  });

  it("should display nemontemi days correctly", () => {
    const nemontemiDate: AztecDate = {
      ...mockAztecDate,
      xiuhpohualli: {
        ...mockAztecDate.xiuhpohualli,
        isNemontemi: true,
        day: 22,
        nemontemi: {
          day: 2,
          meaning: "Day of fear and abstinence",
        },
      },
    };

    render(<DateLookupForm {...defaultProps} aztecDate={nemontemiDate} />);
    
    expect(screen.getByText(/nemontemi day 2/i)).toBeInTheDocument();
    expect(screen.getByText(/unlucky days/i)).toBeInTheDocument();
  });

  it("should display calendar round year", () => {
    render(<DateLookupForm {...defaultProps} />);
    
    expect(screen.getByText(/15 of 52/i)).toBeInTheDocument();
  });

  it("should have proper ARIA labels", () => {
    render(<DateLookupForm {...defaultProps} />);
    
    const dateInput = screen.getByLabelText(/select date/i);
    expect(dateInput).toHaveAttribute("aria-invalid", "false");
    
    const resultsRegion = screen.getByRole("region", {
      name: /aztec calendar conversion results/i,
    });
    expect(resultsRegion).toBeInTheDocument();
  });

  it("should mark input as invalid when error exists", () => {
    render(<DateLookupForm {...defaultProps} error="Invalid date" />);
    
    const dateInput = screen.getByLabelText(/select date/i);
    expect(dateInput).toHaveAttribute("aria-invalid", "true");
    expect(dateInput).toHaveAttribute("aria-describedby", "date-error");
  });

  it("should sync input value with selectedDate prop", () => {
    const { rerender } = render(<DateLookupForm {...defaultProps} />);
    
    const dateInput = screen.getByLabelText(/select date/i) as HTMLInputElement;
    expect(dateInput.value).toBe("2024-01-15");
    
    rerender(
      <DateLookupForm
        {...defaultProps}
        selectedDate={new Date("2024-06-20")}
      />
    );
    
    expect(dateInput.value).toBe("2024-06-20");
  });

  it("should call onValidationError when invalid date is entered", async () => {
    const user = userEvent.setup();
    const onValidationError = vi.fn();
    render(<DateLookupForm {...defaultProps} onValidationError={onValidationError} />);
    
    const dateInput = screen.getByLabelText(/select date/i);
    await user.clear(dateInput);
    
    expect(onValidationError).toHaveBeenCalledWith("Please enter a date");
  });
});
