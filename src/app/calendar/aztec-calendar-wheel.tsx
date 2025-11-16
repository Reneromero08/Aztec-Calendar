"use client";

import { useEffect, useRef, useState } from "react";
import {
  daySigns,
  tonalpohualliNumbers,
  xiuhpohualliMonths,
  useAztecDate,
  type AztecDate,
  type DaySign,
  type TonalpohualliNumber,
  type XiuhpohualliMonth,
} from "@/lib/aztec-calendar";

interface SegmentInfo {
  type: "daySign" | "number" | "month";
  data: DaySign | TonalpohualliNumber | XiuhpohualliMonth;
  index: number;
}

interface AztecCalendarWheelProps {
  selectedDate?: Date;
  aztecDate?: AztecDate | null;
}

export default function AztecCalendarWheel({ selectedDate, aztecDate: externalAztecDate }: AztecCalendarWheelProps) {
  const [selectedSegment, setSelectedSegment] = useState<SegmentInfo | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<SegmentInfo | null>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const [highContrast, setHighContrast] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { aztecDate: defaultAztecDate } = useAztecDate(selectedDate);

  const aztecDate = externalAztecDate !== undefined ? externalAztecDate : defaultAztecDate;

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = Math.min(containerRef.current.offsetWidth, 800);
        setDimensions({ width, height: width });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const maxRadius = Math.min(centerX, centerY) - 20;

  // Ring radii
  const innerRadius = maxRadius * 0.15;
  const numbersInnerRadius = maxRadius * 0.2;
  const numbersOuterRadius = maxRadius * 0.4;
  const daySignsInnerRadius = maxRadius * 0.45;
  const daySignsOuterRadius = maxRadius * 0.7;
  const monthsInnerRadius = maxRadius * 0.75;
  const monthsOuterRadius = maxRadius * 0.95;

  // Color schemes inspired by Aztec aesthetics
  const colors = {
    primary: "rgb(14, 165, 233)", // sky-500
    accent: "rgb(168, 85, 247)", // purple-500
    earth: "rgb(217, 119, 6)", // amber-600
    fire: "rgb(220, 38, 38)", // red-600
    water: "rgb(59, 130, 246)", // blue-500
    wind: "rgb(156, 163, 175)", // gray-400
  };

  const getColorForIndex = (index: number, total: number): string => {
    if (highContrast) {
      // High contrast mode: use only distinct, saturated colors
      const distinctColors = [
        "hsl(0, 100%, 40%)",    // Red
        "hsl(30, 100%, 40%)",   // Orange
        "hsl(60, 100%, 40%)",   // Yellow
        "hsl(120, 100%, 30%)",  // Green
        "hsl(180, 100%, 30%)",  // Cyan
        "hsl(240, 100%, 40%)",  // Blue
        "hsl(270, 100%, 40%)",  // Purple
        "hsl(300, 100%, 40%)",  // Magenta
      ];
      return distinctColors[index % distinctColors.length];
    }
    const hue = (index / total) * 360;
    return `hsl(${hue}, 60%, 55%)`;
  };

  const createArc = (
    startAngle: number,
    endAngle: number,
    innerR: number,
    outerR: number
  ): string => {
    const startInnerX = centerX + innerR * Math.cos(startAngle);
    const startInnerY = centerY + innerR * Math.sin(startAngle);
    const endInnerX = centerX + innerR * Math.cos(endAngle);
    const endInnerY = centerY + innerR * Math.sin(endAngle);
    const startOuterX = centerX + outerR * Math.cos(endAngle);
    const startOuterY = centerY + outerR * Math.sin(endAngle);
    const endOuterX = centerX + outerR * Math.cos(startAngle);
    const endOuterY = centerY + outerR * Math.sin(startAngle);

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    return [
      `M ${startInnerX} ${startInnerY}`,
      `A ${innerR} ${innerR} 0 ${largeArcFlag} 1 ${endInnerX} ${endInnerY}`,
      `L ${startOuterX} ${startOuterY}`,
      `A ${outerR} ${outerR} 0 ${largeArcFlag} 0 ${endOuterX} ${endOuterY}`,
      "Z",
    ].join(" ");
  };

  const getTextPosition = (angle: number, radius: number) => {
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const isSegmentActive = (
    segment: SegmentInfo,
    activeSegment: SegmentInfo | null
  ): boolean => {
    if (!activeSegment) return false;
    return (
      segment.type === activeSegment.type && segment.index === activeSegment.index
    );
  };

  const isCurrentSegment = (type: string, index: number): boolean => {
    if (!aztecDate) return false;
    if (type === "daySign") {
      return aztecDate.tonalpohualli.daySign.position === index + 1;
    }
    if (type === "number") {
      return aztecDate.tonalpohualli.number.value === index + 1;
    }
    if (type === "month") {
      return aztecDate.xiuhpohualli.month.position === index + 1;
    }
    return false;
  };

  const renderDaySignsRing = () => {
    return daySigns.map((sign, index) => {
      const startAngle = (index / 20) * 2 * Math.PI - Math.PI / 2;
      const endAngle = ((index + 1) / 20) * 2 * Math.PI - Math.PI / 2;
      const midAngle = (startAngle + endAngle) / 2;
      const textRadius = (daySignsInnerRadius + daySignsOuterRadius) / 2;
      const textPos = getTextPosition(midAngle, textRadius);

      const segmentInfo: SegmentInfo = { type: "daySign", data: sign, index };
      const isHovered = isSegmentActive(segmentInfo, hoveredSegment);
      const isSelected = isSegmentActive(segmentInfo, selectedSegment);
      const isCurrent = isCurrentSegment("daySign", index);

      return (
        <g key={`daysign-${index}`}>
          <path
            d={createArc(startAngle, endAngle, daySignsInnerRadius, daySignsOuterRadius)}
            fill={getColorForIndex(index, 20)}
            stroke="white"
            strokeWidth="2"
            opacity={isHovered || isSelected || isCurrent ? 1 : 0.7}
            className="transition-all duration-300 cursor-pointer"
            style={{
              filter: isCurrent
                ? "drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))"
                : isHovered || isSelected
                  ? "brightness(1.2)"
                  : "none",
            }}
            onMouseEnter={() => setHoveredSegment(segmentInfo)}
            onMouseLeave={() => setHoveredSegment(null)}
            onClick={() =>
              setSelectedSegment(
                isSelected ? null : segmentInfo
              )
            }
            role="button"
            tabIndex={0}
            aria-label={`${sign.nahuatlName} - ${sign.englishName}: ${sign.meaning}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedSegment(isSelected ? null : segmentInfo);
              }
            }}
          />
          <text
            x={textPos.x}
            y={textPos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={Math.max(12, dimensions.width / 40)}
            fontWeight="bold"
            pointerEvents="none"
            style={{ userSelect: "none" }}
          >
            {sign.glyph}
          </text>
        </g>
      );
    });
  };

  const renderNumbersRing = () => {
    return tonalpohualliNumbers.map((num, index) => {
      const startAngle = (index / 13) * 2 * Math.PI - Math.PI / 2;
      const endAngle = ((index + 1) / 13) * 2 * Math.PI - Math.PI / 2;
      const midAngle = (startAngle + endAngle) / 2;
      const textRadius = (numbersInnerRadius + numbersOuterRadius) / 2;
      const textPos = getTextPosition(midAngle, textRadius);

      const segmentInfo: SegmentInfo = { type: "number", data: num, index };
      const isHovered = isSegmentActive(segmentInfo, hoveredSegment);
      const isSelected = isSegmentActive(segmentInfo, selectedSegment);
      const isCurrent = isCurrentSegment("number", index);

      return (
        <g key={`number-${index}`}>
          <path
            d={createArc(startAngle, endAngle, numbersInnerRadius, numbersOuterRadius)}
            fill={colors.accent}
            stroke="white"
            strokeWidth="2"
            opacity={isHovered || isSelected || isCurrent ? 1 : 0.6}
            className="transition-all duration-300 cursor-pointer"
            style={{
              filter: isCurrent
                ? "drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))"
                : isHovered || isSelected
                  ? "brightness(1.3)"
                  : "none",
            }}
            onMouseEnter={() => setHoveredSegment(segmentInfo)}
            onMouseLeave={() => setHoveredSegment(null)}
            onClick={() =>
              setSelectedSegment(isSelected ? null : segmentInfo)
            }
            role="button"
            tabIndex={0}
            aria-label={`Number ${num.value} - ${num.nahuatlName}: ${num.meaning}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedSegment(isSelected ? null : segmentInfo);
              }
            }}
          />
          <text
            x={textPos.x}
            y={textPos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={Math.max(14, dimensions.width / 30)}
            fontWeight="bold"
            pointerEvents="none"
            style={{ userSelect: "none" }}
          >
            {num.value}
          </text>
        </g>
      );
    });
  };

  const renderMonthsRing = () => {
    return xiuhpohualliMonths.map((month, index) => {
      const startAngle = (index / 18) * 2 * Math.PI - Math.PI / 2;
      const endAngle = ((index + 1) / 18) * 2 * Math.PI - Math.PI / 2;
      const midAngle = (startAngle + endAngle) / 2;
      const textRadius = (monthsInnerRadius + monthsOuterRadius) / 2;
      const textPos = getTextPosition(midAngle, textRadius);

      const segmentInfo: SegmentInfo = { type: "month", data: month, index };
      const isHovered = isSegmentActive(segmentInfo, hoveredSegment);
      const isSelected = isSegmentActive(segmentInfo, selectedSegment);
      const isCurrent = isCurrentSegment("month", index);

      return (
        <g key={`month-${index}`}>
          <path
            d={createArc(startAngle, endAngle, monthsInnerRadius, monthsOuterRadius)}
            fill={colors.earth}
            stroke="white"
            strokeWidth="2"
            opacity={isHovered || isSelected || isCurrent ? 1 : 0.5}
            className="transition-all duration-300 cursor-pointer"
            style={{
              filter: isCurrent
                ? "drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))"
                : isHovered || isSelected
                  ? "brightness(1.3)"
                  : "none",
            }}
            onMouseEnter={() => setHoveredSegment(segmentInfo)}
            onMouseLeave={() => setHoveredSegment(null)}
            onClick={() =>
              setSelectedSegment(isSelected ? null : segmentInfo)
            }
            role="button"
            tabIndex={0}
            aria-label={`Month ${month.nahuatlName} - ${month.englishName}: ${month.season || "Solar month"}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedSegment(isSelected ? null : segmentInfo);
              }
            }}
          />
          <text
            x={textPos.x}
            y={textPos.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={Math.max(8, dimensions.width / 60)}
            fontWeight="600"
            pointerEvents="none"
            style={{ userSelect: "none" }}
          >
            {month.position}
          </text>
        </g>
      );
    });
  };

  const renderDetailPanel = () => {
    const segment = selectedSegment || hoveredSegment;
    if (!segment) return null;

    const { type, data } = segment;
    let title = "";
    let subtitle = "";
    let description = "";
    let additionalInfo: Array<{ label: string; value: string }> = [];

    if (type === "daySign") {
      const sign = data as DaySign;
      title = sign.nahuatlName;
      subtitle = `${sign.englishName} ${sign.glyph}`;
      description = sign.meaning;
      additionalInfo = [
        { label: "Pronunciation", value: sign.pronunciation },
        { label: "Position", value: `${sign.position} of 20` },
        { label: "Direction", value: sign.direction || "N/A" },
        { label: "Deity", value: sign.deity || "N/A" },
      ];
    } else if (type === "number") {
      const num = data as TonalpohualliNumber;
      title = `${num.value} - ${num.nahuatlName}`;
      subtitle = `Sacred Number`;
      description = num.meaning;
      additionalInfo = [
        { label: "Value", value: `${num.value} of 13` },
        { label: "Gender", value: num.gender || "N/A" },
      ];
    } else if (type === "month") {
      const month = data as XiuhpohualliMonth;
      title = month.nahuatlName;
      subtitle = month.englishName;
      description = month.season || "Solar calendar month";
      additionalInfo = [
        { label: "Position", value: `${month.position} of 18` },
        { label: "Days", value: `${month.days}` },
        { label: "Patron", value: month.patron || "N/A" },
        { label: "Agriculture", value: month.agricultural || "N/A" },
      ];
    }

    return (
      <div
        className="absolute top-4 right-4 max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 border-2 border-primary-200 dark:border-primary-700 transition-all duration-300"
        style={{
          animation: "fadeIn 0.3s ease-in-out",
        }}
        role="tooltip"
        aria-live="polite"
      >
        <div className="mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
            {subtitle}
          </p>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
          {description}
        </p>
        <div className="space-y-1">
          {additionalInfo.map((info, idx) => (
            <div key={idx} className="flex justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">{info.label}:</span>
              <span className="text-gray-900 dark:text-white font-medium">
                {info.value}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setSelectedSegment(null)}
          className="mt-3 w-full px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors text-sm"
          aria-label="Close detail panel"
        >
          Close
        </button>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex-1 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Interactive Aztec Calendar Wheel
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Hover or click segments to explore the calendar system
            </p>
          </div>
          <button
            onClick={() => setHighContrast(!highContrast)}
            className="ml-4 px-3 py-2 text-xs font-medium rounded-lg border-2 transition-colors whitespace-nowrap"
            style={{
              backgroundColor: highContrast ? "rgb(14, 165, 233)" : "transparent",
              borderColor: "rgb(14, 165, 233)",
              color: highContrast ? "white" : "rgb(14, 165, 233)",
            }}
            aria-label={`${highContrast ? "Disable" : "Enable"} high contrast mode`}
            aria-pressed={highContrast}
          >
            {highContrast ? "✓ High Contrast" : "High Contrast"}
          </button>
        </div>
      </div>

      <div className="relative">
        <svg
          width={dimensions.width}
          height={dimensions.height}
          className="mx-auto"
          role="img"
          aria-label="Interactive Aztec calendar wheel showing day signs, numbers, and months in concentric rings"
        >
          {/* Center circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={innerRadius}
            fill={colors.primary}
            stroke="white"
            strokeWidth="3"
          />
          <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={Math.max(16, dimensions.width / 25)}
            fontWeight="bold"
          >
            🌞
          </text>

          {/* Render rings from innermost to outermost */}
          {renderNumbersRing()}
          {renderDaySignsRing()}
          {renderMonthsRing()}
        </svg>

        {renderDetailPanel()}
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <div className="w-4 h-4 mx-auto mb-2 rounded-full" style={{ backgroundColor: colors.accent }} />
          <p className="font-semibold text-gray-900 dark:text-white">13 Numbers</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Inner ring</p>
        </div>
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <div className="w-4 h-4 mx-auto mb-2 rounded-full bg-gradient-to-r from-red-500 to-blue-500" />
          <p className="font-semibold text-gray-900 dark:text-white">20 Day Signs</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Middle ring</p>
        </div>
        <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
          <div className="w-4 h-4 mx-auto mb-2 rounded-full" style={{ backgroundColor: colors.earth }} />
          <p className="font-semibold text-gray-900 dark:text-white">18 Months</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Outer ring</p>
        </div>
      </div>

      {aztecDate && (
        <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Selected Date:</span>{" "}
            {aztecDate.tonalpohualli.number.value} {aztecDate.tonalpohualli.daySign.nahuatlName} ({aztecDate.tonalpohualli.daySign.glyph})
            {" • "}
            Day {aztecDate.xiuhpohualli.day} of {aztecDate.xiuhpohualli.month.nahuatlName}
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
