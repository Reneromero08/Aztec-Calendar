import DaySignCard from "./DaySignCard";
import MonthCard from "./MonthCard";
import NumberCard from "./NumberCard";
import {
  daySigns,
  tonalpohualliNumbers,
  xiuhpohualliMonths,
} from "@/lib/aztec-calendar";

export function DaySignGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {daySigns.map((daySign) => (
        <DaySignCard key={daySign.position} daySign={daySign} showDetailLink={false} />
      ))}
    </div>
  );
}

export function TonalpohualliNumberGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tonalpohualliNumbers.map((number) => (
        <NumberCard key={number.value} number={number} showDetailLink={false} />
      ))}
    </div>
  );
}

export function XiuhpohualliMonthGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {xiuhpohualliMonths.map((month) => (
        <MonthCard key={month.position} month={month} />
      ))}
    </div>
  );
}
