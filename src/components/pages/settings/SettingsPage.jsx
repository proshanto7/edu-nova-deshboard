"use client";

import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import ProfileCard from "./ProfileCard";
import PasswordCard from "./PasswordCard";
import PreferencesCard from "./PreferencesCard";
import DangerZoneCard from "./DangerZoneCard";
import SettingsSkeleton from "./SettingsSkeleton";
import SettingsMessage from "./SettingsMessage";

export default function SettingsPage() {
  const { logout } = useAuth();
  const { profile, loading, error, saveProfile } = useProfile();

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-3xl p-4 sm:p-6 lg:p-8">
        <SettingsSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-3xl p-4 sm:p-6 lg:p-8">
        <SettingsMessage type="error" text={error} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-(--text-primary) sm:text-2xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-(--text-secondary)">
          Manage your profile, security, and preferences.
        </p>
      </div>

      <ProfileCard profile={profile} saveProfile={saveProfile} />
      <PasswordCard />
      <PreferencesCard />
      <DangerZoneCard logout={logout} />
    </div>
  );
}
