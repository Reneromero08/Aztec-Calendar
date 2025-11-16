import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LearningToolsContainer from "../LearningToolsContainer";
import * as aztecCalendar from "@/lib/aztec-calendar";
import type { AztecDate, Trecena, TonalpohualliDate } from "@/lib/aztec-calendar";

vi.mock("@/app/calendar/aztec-calendar-wheel", () => ({
  default: ({ aztecDate }: { aztecDate: aztecCalendar.AztecDate | null }) => (
    <div data-testid="calendar-wheel">
      Calendar Wheel
      {aztecDate && (
        <span data-testid="wheel-date">
          {aztecDate.tonalpohualli.number.value} {aztecDate.tonalpohualli.daySign.nahuatlName}
        </span>
      )}
    </div>
  ),
}));

describe("LearningToolsContainer", () => {
  const baseDate = new Date("2024-01-15T00:00:00.000Z");
  const baseAztecDate: AztecDate = {
    gregorianDate: baseDate,
    tonalpohualli: {
      number: {
        value: 7,
        nahuatlName: "Chicome",
        meaning: "Seven represents completion",
        gender: "Neutral",
      },
      daySign: aztecCalendar.daySigns[0],
      dayCount: 7,
    },
    xiuhpohualli: {
      month: aztecCalendar.xiuhpohualliMonths[0],
      day: 5,
      dayOfYear: 5,
      isNemontemi: false,
    },
    yearInRound: 15,
  };

  const dayInMs = 1000 * 60 * 60 * 24;

  const createAztecDate = (date: Date): AztecDate => {
    const offset = Math.round((date.getTime() - baseDate.getTime()) / dayInMs);
    const numberValue = ((baseAztecDate.tonalpohualli.number.value + offset - 1 + 13) % 13) + 1;
    const dayCount = baseAztecDate.tonalpohualli.dayCount + offset;
    const daySignIndex = ((baseAztecDate.tonalpohualli.daySign.position - 1 + offset + 20) % 20) + 1;
    const monthIndex = ((baseAztecDate.xiuhpohualli.month.position - 1 + offset) % 18) + 1;

    return {
      gregorianDate: date,
      tonalpohualli: {
        number: aztecCalendar.tonalpohualliNumbers[numberValue - 1],
        daySign: aztecCalendar.daySigns[daySignIndex - 1],
        dayCount,
      },
      xiuhpohualli: {
        month: aztecCalendar.xiuhpohualliMonths[monthIndex - 1],
        day: ((baseAztecDate.xiuhpohualli.day + offset - 1 + 20) % 20) + 1,
        dayOfYear: ((baseAztecDate.xiuhpohualli.dayOfYear + offset - 1 + 365) % 365) + 1,
        isNemontemi: false,
      },
      yearInRound: ((baseAztecDate.yearInRound + Math.floor(offset / 365) - 1 + 52) % 52) + 1,
    };
  };

  const createTrecena = (date: Date): Trecena => {
    const aztecDate = createAztecDate(date);
    const dayCount = aztecDate.tonalpohualli.dayCount;
    const trecenaNumber = Math.floor((dayCount - 1) / 13) + 1;
    const trecenaStart = (trecenaNumber - 1) * 13 + 1;
    const rulingSignPosition = ((trecenaStart - 1) % 20) + 1;
    const rulingSign = aztecCalendar.daySigns[rulingSignPosition - 1];

    const daysInTrecena: TonalpohualliDate[] = Array.from({ length: 13 }, (_, index) => {
      const currentDayCount = trecenaStart + index;
      const numberValue = ((currentDayCount - 1) % 13) + 1;
      const daySignPosition = ((currentDayCount - 1) % 20) + 1;

      return {
        number: aztecCalendar.tonalpohualliNumbers[numberValue - 1],
        daySign: aztecCalendar.daySigns[daySignPosition - 1],
        dayCount: currentDayCount,
      };
    });

    return {
      trecenaNumber,
      rulingSign,
      daysInTrecena,
    };
  };

  let useAztecDateSpy: ReturnType<typeof vi.spyOn>;
  let useCurrentTrecenaSpy: ReturnType<typeof vi.spyOn>;
  let validateDateSpy: ReturnType<typeof vi.spyOn>;
  const originalValidateDate = aztecCalendar.validateDate;

  beforeEach(() => {
    useAztecDateSpy = vi.spyOn(aztecCalendar, "useAztecDate");
    useCurrentTrecenaSpy = vi.spyOn(aztecCalendar, "useCurrentTrecena");
    validateDateSpy = vi.spyOn(aztecCalendar, "validateDate");

    useAztecDateSpy.mockImplementation((date: Date = baseDate) => ({
      aztecDate: createAztecDate(date),
      error: null,
      isLoading: false,
    }));

    useCurrentTrecenaSpy.mockImplementation((date: Date = baseDate) => ({
      trecena: createTrecena(date),
      error: null,
      isLoading: false,
    }));

    validateDateSpy.mockImplementation((date: Date) => originalValidateDate(date));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders all learning tool components", () => {
    render(<LearningToolsContainer />);

    expect(screen.getByRole("heading", { name: /learning tools/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /date lookup/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /calendar visualization/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /cycle navigation/i })).toBeInTheDocument();
  });

  it("shows glossary button", () => {
    render(<LearningToolsContainer />);

    expect(screen.getByRole("button", { name: /open glossary/i })).toBeInTheDocument();
  });

  it("opens glossary modal when button is clicked", async () => {
    const user = userEvent.setup();
    render(<LearningToolsContainer />);

    const glossaryButton = screen.getByRole("button", { name: /open glossary/i });
    await user.click(glossaryButton);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: /calendar glossary/i })).toBeInTheDocument();
    });
  });

  it("displays tooltips hint", () => {
    render(<LearningToolsContainer />);

    expect(screen.getByText(/hover over underlined/i)).toBeInTheDocument();
  });

  it("syncs state across components when date changes via navigation", async () => {
    const user = userEvent.setup();
    render(<LearningToolsContainer />);

    const wheelDate = screen.getByTestId("wheel-date").textContent;

    const nextDayButton = screen.getByRole("button", { name: /next day/i });
    await user.click(nextDayButton);

    await waitFor(() => {
      const updatedWheel = screen.getByTestId("wheel-date").textContent ?? "";
      expect(updatedWheel).not.toBe(wheelDate);
      expect(updatedWheel).toMatch(/8|9|1[0-3]/);
    });
  });

  it("shows learn more section with link to guide", () => {
    render(<LearningToolsContainer />);

    expect(screen.getByRole("heading", { name: /want to learn more/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view full guide/i })).toHaveAttribute(
      "href",
      "/guide/aztec-calendar"
    );
  });

  it("handles validation errors correctly", async () => {
    const user = userEvent.setup();

    validateDateSpy.mockReturnValueOnce({
      isValid: false,
      error: "Date must be between 1900 and 2100",
    });

    render(<LearningToolsContainer />);

    const dateInput = screen.getByLabelText(/select date/i);
    fireEvent.change(dateInput, { target: { value: "1800-01-01" } });

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toHaveTextContent("1900 and 2100");
    });
  });

  it("renders calendar wheel with correct props", () => {
    render(<LearningToolsContainer />);

    const calendarWheel = screen.getByTestId("calendar-wheel");
    expect(calendarWheel).toBeInTheDocument();

    const wheelDate = screen.getByTestId("wheel-date");
    expect(wheelDate).toHaveTextContent("7");
  });
});
