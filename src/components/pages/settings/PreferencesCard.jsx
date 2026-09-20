"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import SettingsSection from "./SettingsSection";

const OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export default function PreferencesCard() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <SettingsSection
      title="Preferences"
      description="Customize your app experience."
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-(--text-primary)">
            Appearance
          </p>
          <p className="text-xs text-(--text-muted)">
            Choose light or dark theme.
          </p>
        </div>

        {/* mounted na hower age skeleton (layout jump na hoyar jonno) */}
        {!mounted ? (
          <div className="h-10 w-full animate-pulse rounded-xl bg-(--border-light) sm:w-44" />
        ) : (
          <div
            role="group"
            aria-label="Theme"
            className="grid grid-cols-2 gap-1 rounded-xl border border-(--border) bg-(--background-input) p-1 sm:w-44"
          >
            {OPTIONS.map((option) => {
              const isActive = theme === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setTheme(option.value)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-(--sidebar-active-bg) text-(--sidebar-active-text)"
                      : "text-(--text-secondary) hover:bg-(--border-light)"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </SettingsSection>
  );
}
