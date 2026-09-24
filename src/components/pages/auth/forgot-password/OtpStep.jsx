"use client";

import { useEffect, useState } from "react";
import { forgotPassword, verifyResetOtp } from "@/lib/api";
import { focusRing } from "@/components/common/uiStyles";
import AuthHeading from "../AuthHeading";
import AuthAlert from "../AuthAlert";
import AuthButton from "../AuthButton";
import OtpInput from "../OtpInput";

const linkButton = `rounded text-sm font-medium transition-colors ${focusRing}`;

// Step 2: email + OTP -> backend resetToken dey
export default function OtpStep({
  email,
  codeLength,
  resendSeconds = 30,
  onVerified,
  onChangeEmail,
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(resendSeconds); // code ei pathano hoyeche, tai shuru theke cooldown

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.length < codeLength) {
      setNotice("");
      setError(`Enter the ${codeLength}-digit code from your email.`);
      return;
    }

    setError("");
    setNotice("");
    setIsVerifying(true);
    try {
      const res = await verifyResetOtp({ email, otp: code });
      // Backend response e token ta kon nam e ashe — shob common nam check kori
      const resetToken =
        res?.data?.resetToken ?? res?.resetToken ?? res?.data?.token;

      if (!resetToken) {
        throw new Error(
          "We couldn't verify that code. Request a new code and try again.",
        );
      }
      onVerified(resetToken);
    } catch (err) {
      setError(err.message);
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setNotice("");
    setIsResending(true);
    try {
      await forgotPassword({ email });
      setCode("");
      setCooldown(resendSeconds);
      setNotice("We sent you a new code.");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsResending(false);
    }
  };

  const canResend = cooldown <= 0 && !isResending;

  return (
    <>
      <AuthHeading title="Check your email">
        We sent a {codeLength}-digit code to{" "}
        <span className="font-medium wrap-break-word text-(--text-primary)">
          {email}
        </span>
        . It can take a minute to arrive.
      </AuthHeading>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <OtpInput
          value={code}
          onChange={(v) => {
            setCode(v);
            if (error) setError("");
          }}
          length={codeLength}
          disabled={isVerifying}
          hasError={!!error}
          autoFocus
        />

        <AuthAlert>{error}</AuthAlert>

        {notice && (
          <p role="status" className="text-sm text-(--success)">
            {notice}
          </p>
        )}

        <AuthButton
          type="submit"
          loading={isVerifying}
          loadingText="Verifying..."
        >
          Verify code
        </AuthButton>
      </form>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-(--text-secondary)">
        <span>Didn&apos;t get the code?</span>
        <button
          type="button"
          onClick={handleResend}
          disabled={!canResend}
          className={`${linkButton} text-(--accent-hover) hover:underline disabled:cursor-not-allowed disabled:text-(--text-muted) disabled:no-underline`}
        >
          {isResending
            ? "Sending..."
            : cooldown > 0
              ? `Resend code in ${cooldown}s`
              : "Resend code"}
        </button>
      </div>

      <button
        type="button"
        onClick={onChangeEmail}
        className={`${linkButton} mt-3 text-(--text-secondary) hover:text-(--text-primary)`}
      >
        Use a different email
      </button>
    </>
  );
}
