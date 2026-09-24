"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { resetPassword } from "@/lib/api";
import { focusRing } from "@/components/common/uiStyles";
import AuthHeading from "../AuthHeading";
import AuthAlert from "../AuthAlert";
import AuthButton from "../AuthButton";
import PasswordField from "../PasswordField";

// Step 3: resetToken + newPassword -> password change
export default function NewPasswordStep({ resetToken, onDone, onRestart }) {
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { newPassword: "", confirmPassword: "" } });

  const onSubmit = async ({ newPassword }) => {
    setServerError("");
    try {
      // confirmPassword backend e pathai na — shudhu ekhane match kore dekhi
      await resetPassword({ resetToken, newPassword });
      onDone();
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <>
      <AuthHeading title="Set a new password">
        Choose a password you don&apos;t use anywhere else.
      </AuthHeading>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
        noValidate
      >
        <PasswordField
          id="new-password"
          label="New password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          autoFocus
          hint="Use at least 8 characters."
          error={errors.newPassword?.message}
          {...register("newPassword", {
            required: "Enter a new password",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        <PasswordField
          id="confirm-password"
          label="Confirm new password"
          autoComplete="new-password"
          placeholder="Re-enter your new password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Re-enter your new password",
            validate: (value) =>
              value === getValues("newPassword") || "Passwords don't match",
          })}
        />

        <AuthAlert>{serverError}</AuthAlert>

        <AuthButton
          type="submit"
          loading={isSubmitting}
          loadingText="Updating password..."
        >
          Update password
        </AuthButton>
      </form>

      {serverError && (
        <button
          type="button"
          onClick={onRestart}
          className={`mt-4 rounded text-sm font-medium text-(--accent-hover) hover:underline ${focusRing}`}
        >
          Start over with a new code
        </button>
      )}
    </>
  );
}
