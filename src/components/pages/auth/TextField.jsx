"use client";

import { forwardRef } from "react";

/**
 * Label + (icon) + input + (right side button) + hint/error.
 * react-hook-form er register() er ref/onChange/onBlur/name shorasori pass hoy.
 *
 *   <TextField id="email" label="Email" icon={MailIcon} error={errors.email?.message}
 *              {...register("email")} />
 */
const TextField = forwardRef(function TextField(
  {
    id,
    label,
    icon: Icon,
    error,
    hint,
    labelAside,
    endAdornment,
    className = "",
    ...inputProps
  },
  ref,
) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label
          htmlFor={id}
          className="text-sm font-medium text-(--text-primary)"
        >
          {label}
        </label>
        {labelAside}
      </div>

      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute top-1/2 left-3.5 h-4.5 w-4.5 -translate-y-1/2 text-(--text-muted)" />
        )}

        <input
          id={id}
          ref={ref}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy}
          className={`h-12 w-full rounded-xl border bg-(--background-input) text-base text-(--text-primary) transition outline-none placeholder:text-(--text-muted) focus:ring-4 ${
            Icon ? "pl-11" : "pl-4"
          } ${endAdornment ? "pr-12" : "pr-4"} ${
            error
              ? "border-(--danger) focus:ring-(--danger)/15"
              : "border-(--text-muted) hover:border-(--text-secondary) focus:border-(--accent) focus:ring-(--accent)/15"
          }`}
          {...inputProps}
        />

        {endAdornment && (
          <div className="absolute inset-y-0 right-1.5 flex items-center">
            {endAdornment}
          </div>
        )}
      </div>

      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-(--danger)">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-sm text-(--text-muted)">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export default TextField;
