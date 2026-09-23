"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Modal from "@/components/common/Modal";
import FormField from "@/components/common/FormField";
import { inputClass } from "@/components/common/uiStyles";
import PasswordField from "./PasswordField";
import AvatarField from "./AvatarField";

const EMPTY_FORM = { name: "", email: "", password: "", avatar: null };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function MentorFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) {
  const [serverError, setServerError] = useState("");
  const isEditing = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: EMPTY_FORM,
  });

  useEffect(() => {
    setServerError("");
    if (initialData) {
      reset({
        name: initialData.name,
        email: initialData.email,
        password: "",
        avatar: null,
      });
    } else {
      reset(EMPTY_FORM);
    }
  }, [initialData, reset, isOpen]);

  const onFormSubmit = async (data) => {
    setServerError("");
    try {
      // Image pathate hole FormData lagbe
      const formData = new FormData();
      formData.append("name", data.name.trim());
      formData.append("email", data.email.trim());

      // Edit e password khali thakle pathabo na (purano password thakbe)
      if (data.password) {
        formData.append("password", data.password);
      }

      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }

      await onSubmit(formData);
      onClose();
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Mentor" : "New Mentor"}
    >
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="space-y-5"
        noValidate
      >
        <FormField
          label="Full name"
          htmlFor="mentor-name"
          error={errors.name?.message}
        >
          <input
            id="mentor-name"
            placeholder="e.g. Rahim Uddin"
            autoComplete="off"
            {...register("name", { required: "Name is required" })}
            className={inputClass(!!errors.name)}
          />
        </FormField>

        <FormField
          label="Email"
          htmlFor="mentor-email"
          error={errors.email?.message}
        >
          <input
            id="mentor-email"
            type="email"
            inputMode="email"
            placeholder="mentor@example.com"
            autoComplete="off"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: EMAIL_PATTERN,
                message: "Enter a valid email address",
              },
            })}
            className={inputClass(!!errors.email)}
          />
        </FormField>

        <PasswordField
          register={register}
          error={errors.password}
          isEditing={isEditing}
        />

        <AvatarField setValue={setValue} initialData={initialData} />

        {serverError && (
          <p
            role="alert"
            className="rounded-lg bg-(--danger-bg) px-3 py-2.5 text-sm text-(--danger)"
          >
            {serverError}
          </p>
        )}

        {/* Mobile e stack, sm+ e ek line e */}
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
            {isSubmitting
              ? "Saving..."
              : isEditing
                ? "Save changes"
                : "Create mentor"}
          </button>
        </div>
      </form>
    </Modal>
  );
}