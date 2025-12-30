'use client'

import { ProgressBar, ProgressBarProvider } from "react-transition-progress";

export function ProgressBarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProgressBarProvider>
      <ProgressBar className="fixed h-1 shadow-lg shadow-sky-500/20 bg-sky-500 top-0" />
      {children}
    </ProgressBarProvider>
  );
}