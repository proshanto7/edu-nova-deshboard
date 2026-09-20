"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deactivateMe } from "@/lib/api";
import SettingsSection from "./SettingsSection";
import SettingsMessage from "./SettingsMessage";

export default function DangerZoneCard({ logout }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");

  const handleDeactivate = async () => {
    setError("");
    try {
      await deactivateMe();
      logout();
      router.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SettingsSection
      title="Danger Zone"
      description="Deactivating your account will disable access. This can be reversed only by an admin."
      tone="danger"
    >
      <div className="space-y-3">
        <SettingsMessage type="error" text={error} />

        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="w-full rounded-xl border border-(--danger) px-4 py-2.5 text-sm font-semibold text-(--danger) transition-colors hover:bg-(--danger) hover:text-white sm:w-auto"
          >
            Deactivate Account
          </button>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="text-sm font-medium text-(--text-primary)">
              Are you sure?
            </p>

            <div className="flex gap-2">
              <button
                onClick={handleDeactivate}
                className="flex-1 rounded-lg bg-(--danger) px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:flex-none"
              >
                Yes, deactivate
              </button>
              <button
                onClick={() => setConfirming(false)}
                className="flex-1 rounded-lg border border-(--border) px-3 py-2 text-sm font-medium text-(--text-secondary) transition-colors hover:bg-(--border-light) sm:flex-none"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </SettingsSection>
  );
}
