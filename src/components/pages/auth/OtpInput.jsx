"use client";

import { useEffect, useRef } from "react";

/**
 * N ta alada box e OTP (default 6).
 * - Type korle porer box e jay, Backspace e ager box e fere
 * - Paste / SMS-email autofill kaj kore (pura code ekbare boshe jay)
 * - value string ("123456"), onChange(string)
 */
export default function OtpInput({
  value,
  onChange,
  length = 6,
  disabled = false, // true hole edit kora jay na, kintu focus hariye jay na (readOnly)
  hasError = false,
  autoFocus = false,
  label = "Verification code",
}) {
  const refs = useRef([]);

  useEffect(() => {
    if (autoFocus) refs.current[0]?.focus();
  }, [autoFocus]);

  const focusAt = (index) => {
    const clamped = Math.max(0, Math.min(length - 1, index));
    refs.current[clamped]?.focus();
  };

  const handleChange = (index, e) => {
    const digits = e.target.value.replace(/\D/g, "");
    if (!digits) return;

    let next;
    if (digits.length <= 2) {
      // Ekta digit type kora (select thaka obosthay 1, na hole 2 — shesh ta notun)
      const digit = digits[digits.length - 1];
      next = value.slice(0, index) + digit + value.slice(index + 1);
      onChange(next.slice(0, length));
      focusAt(index + 1);
    } else {
      // Autofill / paste: pura code
      next = (value.slice(0, index) + digits).slice(0, length);
      onChange(next);
      focusAt(next.length >= length ? length - 1 : next.length);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (value[index]) {
        onChange(value.slice(0, index) + value.slice(index + 1));
      } else if (index > 0) {
        onChange(value.slice(0, index - 1) + value.slice(index));
        focusAt(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusAt(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusAt(index + 1);
    }
  };

  const handlePaste = (index, e) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!digits) return;
    e.preventDefault();
    const next = (value.slice(0, index) + digits).slice(0, length);
    onChange(next);
    focusAt(next.length >= length ? length - 1 : next.length);
  };

  // Mouse/touch diye faka box e click korle prothom faka box e niye jai (majhkhane gap na hoy).
  // Eta onFocus e na kore onMouseDown e — karon type korar por code diye focus soralei
  // onFocus chalu hoy, ar tokhon `value` state ta ekhono purano thake.
  const handleMouseDown = (index, e) => {
    if (index > value.length) {
      e.preventDefault();
      focusAt(value.length);
    }
  };

  return (
    <div role="group" aria-label={label}>
      <div
        className="grid gap-2 sm:gap-3"
        style={{ gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))` }}
      >
        {Array.from({ length }, (_, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={value[i] ?? ""}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={(e) => handlePaste(i, e)}
            onMouseDown={(e) => handleMouseDown(i, e)}
            onFocus={(e) => e.target.select()}
            readOnly={disabled}
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${i + 1} of ${length}`}
            aria-invalid={hasError ? "true" : undefined}
            className={`h-14 w-full min-w-0 rounded-xl border bg-(--background-input) text-center text-xl font-semibold text-(--text-primary) transition outline-none focus:ring-4 ${
              disabled ? "opacity-60" : ""
            } ${
              hasError
                ? "border-(--danger) focus:ring-(--danger)/15"
                : "border-(--text-muted) hover:border-(--text-secondary) focus:border-(--accent) focus:ring-(--accent)/15"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
