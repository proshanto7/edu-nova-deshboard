"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { forgotPassword, verifyResetOtp, resetPassword } from "@/lib/api";

const STEPS = {
  EMAIL: 1,
  OTP: 2,
  NEW_PASSWORD: 3,
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.EMAIL);
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [serverError, setServerError] = useState("");
  const [info, setInfo] = useState("");

  return (
    <div className="max-w-md mx-auto mt-16 p-6">
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
        Forgot Password
      </h1>

      {serverError && (
        <p className="text-[var(--danger)] text-sm mb-4">{serverError}</p>
      )}
      {info && <p className="text-[var(--success)] text-sm mb-4">{info}</p>}

      {step === STEPS.EMAIL && (
        <EmailStep
          onSuccess={(submittedEmail) => {
            setEmail(submittedEmail);
            setInfo("OTP sent to your email.");
            setServerError("");
            setStep(STEPS.OTP);
          }}
          onError={setServerError}
        />
      )}

      {step === STEPS.OTP && (
        <OtpStep
          email={email}
          onSuccess={(token) => {
            setResetToken(token);
            setInfo("");
            setServerError("");
            setStep(STEPS.NEW_PASSWORD);
          }}
          onError={setServerError}
          onResend={async () => {
            setServerError("");
            try {
              await forgotPassword({ email });
              setInfo("OTP resent.");
            } catch (err) {
              setServerError(err.message);
            }
          }}
        />
      )}

      {step === STEPS.NEW_PASSWORD && (
        <NewPasswordStep
          resetToken={resetToken}
          onSuccess={() => {
            router.push("/login");
          }}
          onError={setServerError}
        />
      )}
    </div>
  );
}

// ---------------- Step 1: Email ----------------
function EmailStep({ onSuccess, onError }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: "" } });

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data);
      onSuccess(data.email);
    } catch (err) {
      onError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <input
          type="email"
          placeholder="Your registered email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
          })}
          className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-input)] text-[var(--text-primary)]"
        />
        {errors.email && (
          <p className="text-[var(--danger)] text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full p-2.5 rounded-lg bg-[var(--primary)] text-[var(--background)] font-medium hover:bg-[var(--primary-hover)] transition-colors"
      >
        {isSubmitting ? "Sending..." : "Send OTP"}
      </button>
    </form>
  );
}

// ---------------- Step 2: OTP ----------------
function OtpStep({ email, onSuccess, onError, onResend }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { otp: "" } });

  const onSubmit = async (data) => {
    try {
      const res = await verifyResetOtp({ email, otp: data.otp });
      onSuccess(res.data.resetToken);
    } catch (err) {
      onError(err.message);
    }
  };

  return (
    <div>
      <p className="text-sm text-[var(--text-secondary)] mb-4">
        Sent to <strong>{email}</strong>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div>
          <input
            placeholder="6-digit OTP"
            maxLength={6}
            {...register("otp", {
              required: "OTP is required",
              pattern: { value: /^\d{6}$/, message: "OTP must be 6 digits" },
            })}
            className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-input)] text-[var(--text-primary)]"
          />
          {errors.otp && (
            <p className="text-[var(--danger)] text-xs mt-1">{errors.otp.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-2.5 rounded-lg bg-[var(--primary)] text-[var(--background)] font-medium hover:bg-[var(--primary-hover)] transition-colors"
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      <button
        onClick={onResend}
        className="mt-3 text-sm text-[var(--accent)] hover:text-[var(--accent-hover)]"
      >
        Resend OTP
      </button>
    </div>
  );
}

// ---------------- Step 3: New Password ----------------
function NewPasswordStep({ resetToken, onSuccess, onError }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { newPassword: "" } });

  const onSubmit = async (data) => {
    try {
      await resetPassword({ resetToken, newPassword: data.newPassword });
      onSuccess();
    } catch (err) {
      onError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <input
          type="password"
          placeholder="New Password"
          {...register("newPassword", {
            required: "New password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters" },
          })}
          className="w-full p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background-input)] text-[var(--text-primary)]"
        />
        {errors.newPassword && (
          <p className="text-[var(--danger)] text-xs mt-1">{errors.newPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full p-2.5 rounded-lg bg-[var(--primary)] text-[var(--background)] font-medium hover:bg-[var(--primary-hover)] transition-colors"
      >
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}