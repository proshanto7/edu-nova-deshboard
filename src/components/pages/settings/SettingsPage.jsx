"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { changePassword, deactivateMe } from "@/lib/api";

export default function SettingsPage() {
  const { logout } = useAuth();
  const { profile, loading, error, saveProfile } = useProfile();

  if (loading) {
    return <p className="p-6 text-(--text-secondary)">Loading settings...</p>;
  }

  if (error) {
    return (
      <p className="p-6 text-(--danger) bg-(--danger-bg) rounded-lg m-6">{error}</p>
    );
  }

  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-(--text-primary)">Settings</h1>
        <p className="text-sm text-(--text-secondary) mt-1">
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

// ==================== Profile Card ====================
function ProfileCard({ profile, saveProfile }) {
  const [message, setMessage] = useState({ type: "", text: "" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: profile?.name || "",
      phone: profile?.phone || "",
    },
  });

  const onSubmit = async (data) => {
    setMessage({ type: "", text: "" });
    try {
      await saveProfile(data);
      setMessage({ type: "success", text: "Profile updated successfully." });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const initials = (profile?.name || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section className="rounded-xl border border-(--border) bg-(--background-card) p-6 transition-colors">
      <h2 className="text-base font-semibold text-(--text-primary) mb-1">Profile</h2>
      <p className="text-xs text-(--text-muted) mb-5">
        Your basic account information.
      </p>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-(--accent) text-(--accent-text) flex items-center justify-center text-xl font-semibold shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-(--text-primary) font-medium">{profile?.name}</p>
          <p className="text-xs text-(--text-muted)">{profile?.email}</p>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-(--sidebar-active-bg) text-(--sidebar-active-text) capitalize">
            {profile?.role}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <label className="text-xs text-(--text-secondary) block mb-1">Full Name</label>
          <input
            {...register("name", { required: "Name is required", maxLength: 100 })}
            className="w-full p-2.5 rounded-lg border border-(--border) bg-(--background-input) text-(--text-primary)"
          />
          {errors.name && (
            <p className="text-(--danger) text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs text-(--text-secondary) block mb-1">Phone</label>
          <input
            {...register("phone")}
            placeholder="Not set"
            className="w-full p-2.5 rounded-lg border border-(--border) bg-(--background-input) text-(--text-primary)"
          />
        </div>

        <div>
          <label className="text-xs text-(--text-secondary) block mb-1">Email</label>
          <input
            value={profile?.email || ""}
            disabled
            className="w-full p-2.5 rounded-lg border border-(--border) bg-(--border-light) text-(--text-muted) cursor-not-allowed"
          />
        </div>

        {message.text && (
          <p className={message.type === "success" ? "text-(--success) text-sm" : "text-(--danger) text-sm"}>
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-lg bg-(--primary) text-(--background) font-medium hover:bg-(--primary-hover) transition-colors"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </section>
  );
}

// ==================== Password Card ====================
function PasswordCard() {
  const [message, setMessage] = useState({ type: "", text: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { currentPassword: "", newPassword: "" },
  });

  const onSubmit = async (data) => {
    setMessage({ type: "", text: "" });
    try {
      await changePassword(data);
      setMessage({ type: "success", text: "Password changed successfully." });
      reset();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <section className="rounded-xl border border-(--border) bg-(--background-card) p-6 transition-colors">
      <h2 className="text-base font-semibold text-(--text-primary) mb-1">Security</h2>
      <p className="text-xs text-(--text-muted) mb-5">
        Update your password to keep your account secure.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <label className="text-xs text-(--text-secondary) block mb-1">Current Password</label>
          <input
            type="password"
            {...register("currentPassword", { required: "Current password is required" })}
            className="w-full p-2.5 rounded-lg border border-(--border) bg-(--background-input) text-(--text-primary)"
          />
          {errors.currentPassword && (
            <p className="text-(--danger) text-xs mt-1">{errors.currentPassword.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs text-(--text-secondary) block mb-1">New Password</label>
          <input
            type="password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: { value: 8, message: "Must be at least 8 characters" },
            })}
            className="w-full p-2.5 rounded-lg border border-(--border) bg-(--background-input) text-(--text-primary)"
          />
          {errors.newPassword && (
            <p className="text-(--danger) text-xs mt-1">{errors.newPassword.message}</p>
          )}
        </div>

        {message.text && (
          <p className={message.type === "success" ? "text-(--success) text-sm" : "text-(--danger) text-sm"}>
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-lg bg-(--primary) text-(--background) font-medium hover:bg-(--primary-hover) transition-colors"
        >
          {isSubmitting ? "Updating..." : "Change Password"}
        </button>
      </form>
    </section>
  );
}

// ==================== Preferences Card ====================
function PreferencesCard() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <section className="rounded-xl border border-(--border) bg-(--background-card) p-6 transition-colors">
      <h2 className="text-base font-semibold text-(--text-primary) mb-1">Preferences</h2>
      <p className="text-xs text-(--text-muted) mb-5">Customize your app experience.</p>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-(--text-primary) font-medium">Appearance</p>
          <p className="text-xs text-(--text-muted)">Choose light or dark theme.</p>
        </div>

        <div className="flex rounded-lg border border-(--border) overflow-hidden">
          <button
            onClick={() => setTheme("light")}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              theme === "light"
                ? "bg-(--sidebar-active-bg) text-(--sidebar-active-text)"
                : "text-(--text-secondary) hover:bg-(--border-light)"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
              theme === "dark"
                ? "bg-(--sidebar-active-bg) text-(--sidebar-active-text)"
                : "text-(--text-secondary) hover:bg-(--border-light)"
            }`}
          >
            Dark
          </button>
        </div>
      </div>
    </section>
  );
}

// ==================== Danger Zone Card ====================
function DangerZoneCard({ logout }) {
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
    <section className="rounded-xl border border-(--danger) bg-(--danger-bg) p-6">
      <h2 className="text-base font-semibold text-(--danger) mb-1">Danger Zone</h2>
      <p className="text-xs text-(--text-muted) mb-5">
        Deactivating your account will disable access. This can be reversed only by an admin.
      </p>

      {error && <p className="text-(--danger) text-sm mb-3">{error}</p>}

      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="px-4 py-2 rounded-lg border border-(--danger) text-(--danger) font-medium hover:bg-(--danger) hover:text-white transition-colors"
        >
          Deactivate Account
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <p className="text-sm text-(--text-primary)">Are you sure?</p>
          <button
            onClick={handleDeactivate}
            className="px-3 py-1.5 rounded-lg bg-(--danger) text-white text-xs font-medium"
          >
            Yes, deactivate
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="px-3 py-1.5 rounded-lg border border-(--border) text-(--text-secondary) text-xs font-medium"
          >
            Cancel
          </button>
        </div>
      )}
    </section>
  );
}