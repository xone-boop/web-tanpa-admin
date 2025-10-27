// Quantity stepper with increment and decrement controls.
"use client";

import * as React from "react";
import { clsx } from "clsx";

interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  min = 1,
  max = 99,
  onChange
}) => {
  const handleDecrement = () => {
    onChange(Math.max(min, value - 1));
  };

  const handleIncrement = () => {
    onChange(Math.min(max, value + 1));
  };

  return (
    <div className="inline-flex items-center rounded-full border border-dark/10 bg-white">
      <button
        type="button"
        className={clsx(
          "h-10 w-10 select-none rounded-l-full text-lg font-semibold text-dark transition hover:bg-primary/10",
          value <= min && "cursor-not-allowed opacity-40"
        )}
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Kurangi jumlah"
      >
        −
      </button>
      <span className="min-w-[3rem] text-center text-base font-semibold text-textDark">
        {value}
      </span>
      <button
        type="button"
        className={clsx(
          "h-10 w-10 select-none rounded-r-full text-lg font-semibold text-dark transition hover:bg-primary/10",
          value >= max && "cursor-not-allowed opacity-40"
        )}
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Tambah jumlah"
      >
        +
      </button>
    </div>
  );
};
