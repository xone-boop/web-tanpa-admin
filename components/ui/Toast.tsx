// Toast system for ephemeral success and error messages.
"use client";

import * as React from "react";
import { clsx } from "clsx";

type ToastIntent = "success" | "error" | "info";

type ToastItem = {
  id: number;
  title: string;
  intent: ToastIntent;
};

interface ToastContextValue {
  pushToast: (input: { title: string; intent?: ToastIntent }) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export const useToast = (): ToastContextValue => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

type ToastProviderProps = {
  children: React.ReactNode;
  duration?: number;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  duration = 2500
}) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const pushToast = React.useCallback(
    ({ title, intent = "success" }: { title: string; intent?: ToastIntent }) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, title, intent }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    },
    [duration]
  );

  return (
    <ToastContext.Provider value={{ pushToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4">
        <div className="flex w-full max-w-sm flex-col gap-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={clsx(
                "pointer-events-auto rounded-xl px-4 py-3 text-sm text-textLight shadow-lg",
                toast.intent === "success" && "bg-primary",
                toast.intent === "error" && "bg-[#8C1C1D]",
                toast.intent === "info" && "bg-dark"
              )}
            >
              {toast.title}
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};
