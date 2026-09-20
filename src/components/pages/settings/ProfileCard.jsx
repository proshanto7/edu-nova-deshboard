"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Avatar from "@/components/common/Avatar";
import FormField from "@/components/common/FormField";
import { inputClass } from "@/components/common/uiStyles";
import SettingsSection from "./SettingsSection";
import SettingsMessage from "./SettingsMessage";

export default function ProfileCard({ profile, saveProfile }) {
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

  // avatar string URL ba { url } object, duita shape-i handle kore
  const avatarSrc =
    typeof profile?.avatar === "string"
      ? profile.avatar
      : profile?.avatar?.url || "";

  // maxLength rule e message nai, tai fallback dekhabo
  const nameError = errors.name
    ? errors.name.message || "Name cannot exceed 100 characters"
    : "";

  return (
    <SettingsSection
      title="Profile"
      description="Your basic account information."
    >
      {/* Avatar + basic info: mobile e center, sm+ e left */}
      <div className="mb-6 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <Avatar
          name={profile?.name || ""}
          src={avatarSrc}
          className="h-20 w-20 text-2xl sm:h-16 sm:w-16 sm:text-xl"
        />

        <div className="min-w-0">
          <p className="truncate font-semibold text-(--text-primary)">
            {profile?.name}
          </p>
          <p className="truncate text-sm text-(--text-muted)">
            {profile?.email}
          </p>
          <span className="mt-2 inline-block rounded-full bg-(--sidebar-active-bg) px-2.5 py-1 text-xs font-medium text-(--sidebar-active-text) capitalize">
            {profile?.role}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Full name" htmlFor="profile-name" error={nameError}>
            <input
              id="profile-name"
              {...register("name", {
                required: "Name is required",
                maxLength: 100,
              })}
              className={inputClass(!!errors.name)}
            />
          </FormField>

          <FormField label="Phone" htmlFor="profile-phone">
            <input
              id="profile-phone"
              inputMode="tel"
              placeholder="Not set"
              {...register("phone")}
              className={inputClass(false)}
            />
          </FormField>
        </div>

        <FormField label="Email" htmlFor="profile-email">
          <input
            id="profile-email"
            value={profile?.email || ""}
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-(--border) bg-(--border-light) px-3.5 py-2.5 text-base text-(--text-muted) sm:text-sm"
          />
        </FormField>

        <SettingsMessage type={message.type} text={message.text} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-(--primary) px-5 py-2.5 text-sm font-semibold text-background transition-all hover:bg-(--primary-hover) active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </SettingsSection>
  );
}
