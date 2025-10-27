// Styled text input for forms with consistent focus treatment.
"use client";

import * as React from "react";
import { clsx } from "clsx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={clsx(
          "w-full rounded-lg border border-dark/10 bg-white px-4 py-3 text-sm text-textDark transition focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
