"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { forgotPassword } from "@/lib/api";
import { ArrowLeftIcon, MailIcon } from "@/components/common/Icons";
import { focusRing } from "@/components/common/uiStyles";
import AuthHeading from "../AuthHeading";
import AuthAlert from "../AuthAlert";
import AuthButton from "../AuthButton";
import TextField from "../TextField";

// Step 1: email -> backend OTP pathay
export default function EmailStep({ defaultEmail = "", codeLength, onSent }) {
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: defaultEmail } });

  const onSubmit = async ({ email }) => {
    setServerError("");
    const cleanEmail = email.trim();
    try {
      await forgotPassword({ email: cleanEmail });
      onSent(cleanEmail);
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <>
      <AuthHeading title="Forgot your password?">
        Enter your email and we&apos;ll send you a {codeLength}-digit code to
        reset it.
      </AuthHeading>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
        noValidate
      >
        <TextField
          id="reset-email"
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          icon={MailIcon}
          autoFocus
          error={errors.email?.message}
          {...register("email", {
            required: "Enter your email",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email, like you@example.com",
            },
          })}
        />

        <AuthAlert>{serverError}</AuthAlert>

        <AuthButton
          type="submit"
          loading={isSubmitting}
          loadingText="Sending code..."
        >
          Send code
        </AuthButton>
      </form>

      <Link
        href="/login"
        className={`mt-6 inline-flex items-center gap-1.5 rounded text-sm font-medium text-(--text-secondary) transition-colors hover:text-(--text-primary) ${focusRing}`}
      >
        <ArrowLeftIcon />
        Back to log in
      </Link>
    </>
  );
}
