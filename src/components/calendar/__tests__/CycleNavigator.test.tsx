import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CycleNavigator from "../CycleNavigator";
import {
  daySigns,
  tonalpohualliNumbers,
  xiuhpohualliMonths,
} from "@/lib/aztec-calendar";
import * as aztecCalendar from "@/lib/aztec-calendar";
import type { AztecDate, Trecena, TonalpohualliDate } from "@/lib/aztec-calendar";

describe("CycleNavigator", () => {
  const currentDate = new Date("2024-03-20T00:00:00.000Z");
  const currentDayCount = 42; // Within trecena 4 (days 40-52)
  const currentNumberValue = ((currentDayCount - 1) % 13) + 1;
  const currentDaySignPosition = ((currentDayCount - 1) % 20) + 1;
  const currentDaySign = daySigns[currentDaySignPosition - 1];
  const currentNumber = tonalpohualliNumbers[currentNumberValue - 1];
  const currentMonth = xiuhpohualliMonths[2];

  const generateTrecena = (): Trecena => {
    const trecenaNumber = Math.floor((currentDayCount - 1) / 13) + 1;
    const trecenaStartDayCount = (trecenaNumber - 1) * 13 + 1;
    const rulingSignPosition = ((trecenaStartDayCount - 1) % 20) + 1;
    const rulingSign = daySigns[rulingSignPosition - 1];

    const daysInTrecena: TonalpohualliDate[] = Array.from({ length: 13 }, (_, index) => {
      const dayCount = trecenaStartDayCount + index;
      const numberValue = ((dayCount - 1) % 13) + 1;
      const daySignPosition = ((dayCount - 1) % 20) + 1;

      return {
        number: tonalpohualliNumbers[numberValue - 1],
        daySign: daySigns[daySignPosition - 1],
        dayCount,
      };
    });

    return {
      trecenaNumber,
      rulingSign,
      daysInTrecena,
    };
  };

  const trecena = generateTrecena();

  const aztecDate: AztecDate = {
    gregorianDate: currentDate,
    tonalpohualli: {
      number: currentNumber,
      daySign: currentDaySign,
      dayCount: currentDayCount,
    },
    xiuhpohualli: {
      month: currentMonth,
      day: 6,
      dayOfYear: 75,
      isNemontemi: false,
    },
    yearInRound: 12,
  };

  const setup = () => {
    const onDateChange = vi.fn();
    const onValidationError = vi.fn();

    const utils = render(
      <CycleNavigator
        currentDate={currentDate}
        aztecDate={aztecDate}
        trecena={trecena}
        onDateChange={onDateChange}
        onValidationError={onValidationError}
      />
    );

    return {
      ...utils,
      onDateChange,
      onValidationError,
    };
  };

  it("renders navigation controls", () => {
    setup();

    expect(screen.getByRole("heading", { name: /cycle navigation/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /previous day/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next day/i })).toBeInTheDocument();
    expect(screen.getByText(/current trecena/i)).toBeInTheDocument();
    expect(screen.getByText(/days in current trecena/i)).toBeInTheDocument();
  });

  it("calls onDateChange when navigating to the next day", async () => {
    const user = userEvent.setup();
    const { onDateChange } = setup();

    const nextButton = screen.getByRole("button", { name: /next day/i });
    await user.click(nextButton);

    expect(onDateChange).toHaveBeenCalledTimes(1);
    const newDate = onDateChange.mock.calls[0][0] as Date;
    expect(newDate.toISOString()).toBe("2024-03-21T00:00:00.000Z");
  });

  it("calls onDateChange when navigating to the previous day", async () => {
    const user = userEvent.setup();
    const { onDateChange } = setup();

    const previousButton = screen.getByRole("button", { name: /previous day/i });
    await user.click(previousButton);

    expect(onDateChange).toHaveBeenCalledTimes(1);
    const newDate = onDateChange.mock.calls[0][0] as Date;
    expect(newDate.toISOString()).toBe("2024-03-19T00:00:00.000Z");
  });

  it("supports quick jump buttons", async () => {
    const user = userEvent.setup();
    const { onDateChange } = setup();

    const jumpButton = screen.getByRole("button", { name: /jump forward 30 days/i });
    await user.click(jumpButton);

    expect(onDateChange).toHaveBeenCalledTimes(1);
    const newDate = onDateChange.mock.calls[0][0] as Date;
    expect(newDate.toISOString()).toBe("2024-04-19T00:00:00.000Z");
  });

  it("highlights the current trecena button", () => {
    setup();

    const currentButton = screen.getByRole("button", {
      name: new RegExp(`trecena ${trecena.trecenaNumber}`, "i"),
    });

    expect(currentButton).toHaveAttribute("disabled");
    expect(currentButton).toHaveAttribute("aria-current", "true");
  });

  it("highlights the current day within the trecena", () => {
    setup();

    const currentDayButton = screen.getByRole("button", {
      name: new RegExp(`${currentNumber.value} ${currentDaySign.nahuatlName}`, "i"),
    });

    expect(currentDayButton).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onDateChange when selecting a different day within the trecena", async () => {
    const user = userEvent.setup();
    const { onDateChange } = setup();

    const targetDay = trecena.daysInTrecena[5];
    const targetButton = screen.getByRole("button", {
      name: new RegExp(`${targetDay.number.value} ${targetDay.daySign.nahuatlName}`, "i"),
    });

    await user.click(targetButton);

    expect(onDateChange).toHaveBeenCalledTimes(1);
    const newDate = onDateChange.mock.calls[0][0] as Date;
    const expectedOffset = targetDay.dayCount - currentDayCount;
    const expectedDate = new Date(currentDate);
    expectedDate.setDate(expectedDate.getDate() + expectedOffset);
    expect(newDate.toISOString()).toBe(expectedDate.toISOString());
  });

  it("calls onValidationError when validateDate fails", async () => {
    const user = userEvent.setup();
    const onDateChange = vi.fn();
    const onValidationError = vi.fn();

    const validationSpy = vi
      .spyOn(aztecCalendar, "validateDate")
      .mockReturnValueOnce({ isValid: false, error: "Invalid date" });

    render(
      <CycleNavigator
        currentDate={currentDate}
        aztecDate={aztecDate}
        trecena={trecena}
        onDateChange={onDateChange}
        onValidationError={onValidationError}
      />
    );

    const previousButton = screen.getByRole("button", { name: /previous day/i });
    await user.click(previousButton);

    expect(onDateChange).not.toHaveBeenCalled();
    expect(onValidationError).toHaveBeenCalledWith("Invalid date");

    validationSpy.mockRestore();
  });
});
