"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "@/components/common/FormField";
import { inputClass } from "@/components/common/uiStyles";
import { changePassword } from "@/lib/api";
import SettingsSection from "./SettingsSection";
import SettingsMessage from "./SettingsMessage";

export default function PasswordCard() {
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
    <SettingsSection
      title="Security"
      description="Update your password to keep your account secure."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            label="Current password"
            htmlFor="current-password"
            error={errors.currentPassword?.message}
          >
            <input
              id="current-password"
              type="password"
              autoComplete="current-password"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
              className={inputClass(!!errors.currentPassword)}
            />
          </FormField>

          <FormField
            label="New password"
            htmlFor="new-password"
            hint="(min 8 characters)"
            error={errors.newPassword?.message}
          >
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
              })}
              className={inputClass(!!errors.newPassword)}
            />
          </FormField>
        </div>

        <SettingsMessage type={message.type} text={message.text} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-(--primary) px-5 py-2.5 text-sm font-semibold text-background transition-all hover:bg-(--primary-hover) active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? "Updating..." : "Change Password"}
        </button>
      </form>
    </SettingsSection>
  );
}
