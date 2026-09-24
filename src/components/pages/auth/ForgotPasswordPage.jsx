"use client";

import { useState } from "react";
import AuthShell from "./AuthShell";
import StepIndicator from "./forgot-password/StepIndicator";
import EmailStep from "./forgot-password/EmailStep";
import OtpStep from "./forgot-password/OtpStep";
import NewPasswordStep from "./forgot-password/NewPasswordStep";
import SuccessStep from "./forgot-password/SuccessStep";

// Backend je koyta digit er OTP pathay sheta ekhane bosao (shob step e ei ekta-i number use hoy)
const OTP_LENGTH = 6;

const STEP_INDEX = { email: 0, otp: 1, password: 2 };

/**
 * 3 step er flow, ekei page e:
 *   email -> (OTP pathay) -> code dao -> (resetToken pao) -> new password -> done
 * email ar resetToken URL e ba localStorage e rakha hoy na, shudhu memory te.
 */
export default function ForgotPasswordPage() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");

  return (
    <AuthShell>
      {step !== "done" && <StepIndicator current={STEP_INDEX[step]} />}

      {step === "email" && (
        <EmailStep
          defaultEmail={email}
          codeLength={OTP_LENGTH}
          onSent={(sentTo) => {
            setEmail(sentTo);
            setStep("otp");
          }}
        />
      )}

      {step === "otp" && (
        <OtpStep
          email={email}
          codeLength={OTP_LENGTH}
          onVerified={(token) => {
            setResetToken(token);
            setStep("password");
          }}
          onChangeEmail={() => setStep("email")}
        />
      )}

      {step === "password" && (
        <NewPasswordStep
          resetToken={resetToken}
          onDone={() => {
            setResetToken("");
            setStep("done");
          }}
          onRestart={() => {
            setResetToken("");
            setStep("email");
          }}
        />
      )}

      {step === "done" && <SuccessStep />}
    </AuthShell>
  );
}
