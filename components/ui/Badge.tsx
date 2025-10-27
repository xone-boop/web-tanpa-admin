// Decorative badge component for highlighting labels.
import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {}

export const Badge = ({ className, ...props }: BadgeProps) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full bg-accent/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-dark",
        className
      )}
      {...props}
    />
  );
};
