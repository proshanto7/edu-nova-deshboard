"use client";

import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import Modal from "@/components/common/Modal";
import FormField from "@/components/common/FormField";
import { inputClass } from "@/components/common/uiStyles";
import { EyeIcon, EyeOffIcon } from "@/components/common/Icons";

const EMPTY_FORM = { name: "", email: "", password: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function StudentFormModal({ isOpen, onClose, onSubmit }) {
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: EMPTY_FORM,
  });

  useEffect(() => {
    setServerError("");
    setShowPassword(false);
    reset(EMPTY_FORM);
  }, [isOpen, reset]);

  const onFormSubmit = async (data) => {
    setServerError("");
    try {
      const formData = new FormData();
      formData.append("name", data.name.trim());
      formData.append("email", data.email.trim());
      formData.append("password", data.password);

      await onSubmit(formData);
      onClose();
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Student">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="space-y-5"
        noValidate
      >
        <FormField
          label="Full name"
          htmlFor="student-name"
          error={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <input
                id="student-name"
                placeholder="e.g. Karim Ahmed"
                autoComplete="off"
                aria-invalid={errors.name ? "true" : "false"}
                className={inputClass(!!errors.name)}
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
            )}
          />
        </FormField>

        <FormField
          label="Email"
          htmlFor="student-email"
          error={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: EMAIL_PATTERN,
                message: "Enter a valid email address",
              },
            }}
            render={({ field }) => (
              <input
                id="student-email"
                type="email"
                inputMode="email"
                placeholder="student@example.com"
                autoComplete="off"
                aria-invalid={errors.email ? "true" : "false"}
                className={inputClass(!!errors.email)}
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
              />
            )}
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="student-password"
          error={errors.password?.message}
        >
          <div className="relative">
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              }}
              render={({ field }) => (
                <input
                  id="student-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  aria-invalid={errors.password ? "true" : "false"}
                  className={`${inputClass(!!errors.password)} pr-11!`}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-(--text-muted) transition-colors hover:bg-(--border-light) hover:text-(--text-primary)"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </FormField>

        {serverError && (
          <p
            role="alert"
            className="rounded-lg bg-(--danger-bg) px-3 py-2.5 text-sm text-(--danger)"
          >
            {serverError}
          </p>
        )}

        <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-(--border) px-5 py-2.5 text-sm font-medium text-(--text-primary) transition-colors hover:bg-(--border-light)"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-(--primary) px-5 py-2.5 text-sm font-semibold text-background transition-all hover:bg-(--primary-hover) active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Creating..." : "Create student"}
          </button>
        </div>
      </form>
    </Modal>
  );
}