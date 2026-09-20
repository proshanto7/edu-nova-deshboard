"use client";

import { useState } from "react";
import FormField from "@/components/common/FormField";
import { EyeIcon, EyeOffIcon } from "@/components/common/Icons";
import { inputClass } from "@/components/common/uiStyles";

export default function PasswordField({ register, error, isEditing }) {
  const [show, setShow] = useState(false);

  return (
    <FormField
      label="Password"
      htmlFor="mentor-password"
      hint={isEditing ? "(leave empty to keep current)" : undefined}
      error={error?.message}
    >
      <div className="relative">
        <input
          id="mentor-password"
          type={show ? "text" : "password"}
          autoComplete="new-password"
          placeholder={isEditing ? "New password" : "At least 8 characters"}
          aria-invalid={error ? "true" : "false"}
          {...register("password", {
            required: !isEditing ? "Password is required" : false,
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className={`${inputClass(!!error)} pr-11!`}
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-(--text-muted) transition-colors hover:bg-(--border-light) hover:text-(--text-primary)"
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </FormField>
  );
}
