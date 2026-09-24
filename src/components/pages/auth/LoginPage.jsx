"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/lib/api";
import { MailIcon } from "@/components/common/Icons";
import { focusRing } from "@/components/common/uiStyles";
import AuthShell from "./AuthShell";
import AuthHeading from "./AuthHeading";
import AuthAlert from "./AuthAlert";
import AuthButton from "./AuthButton";
import TextField from "./TextField";
import PasswordField from "./PasswordField";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const res = await loginUser(data);
      login({ token: res.data.token, user: res.data.user });
      router.push("/dashboard");
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <AuthShell>
      <AuthHeading title="Log in">
        Use your Edu-Nova account to continue.
      </AuthHeading>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
        noValidate
      >
        <TextField
          id="email"
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          icon={MailIcon}
          error={errors.email?.message}
          {...register("email", {
            required: "Enter your email",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email, like you@example.com",
            },
          })}
        />

        <PasswordField
          id="password"
          label="Password"
          autoComplete="current-password"
          placeholder="Enter your password"
          error={errors.password?.message}
          labelAside={
            <Link
              href="/forgot-password"
              className={`rounded text-sm font-medium text-(--accent-hover) hover:underline ${focusRing}`}
            >
              Forgot password?
            </Link>
          }
          {...register("password", {
            required: "Enter your password",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        <AuthAlert>{serverError}</AuthAlert>

        <AuthButton
          type="submit"
          loading={isSubmitting}
          loadingText="Logging in..."
        >
          Log in
        </AuthButton>
      </form>
    </AuthShell>
  );
}
