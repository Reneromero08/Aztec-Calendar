"use client";

import { useState, useRef, useEffect } from "react";
import type { ReactNode, CSSProperties } from "react";

interface TooltipWrapperProps {
  content: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export default function TooltipWrapper({
  content,
  children,
  position = "top",
}: TooltipWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyles, setTooltipStyles] = useState<CSSProperties>({});
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case "bottom":
          top = triggerRect.bottom + 8;
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
          break;
        case "left":
          top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.left - tooltipRect.width - 8;
          break;
        case "right":
          top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.right + 8;
          break;
      }

      setTooltipStyles({
        position: "fixed",
        top: `${top}px`,
        left: `${left}px`,
        zIndex: 9999,
      });
    }
  }, [isVisible, position]);

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="inline-flex items-center cursor-help border-b border-dashed border-gray-400 dark:border-gray-500"
        tabIndex={0}
        role="button"
        aria-label={`Show tooltip: ${content}`}
      >
        {children}
      </span>
      {isVisible && (
        <div
          ref={tooltipRef}
          style={tooltipStyles}
          className="max-w-xs px-3 py-2 text-sm text-white bg-gray-900 dark:bg-gray-700 rounded-lg shadow-lg pointer-events-none"
          role="tooltip"
        >
          {content}
        </div>
      )}
    </>
  );
}
