"use client";

import { forwardRef, useState } from "react";
import { LockIcon, EyeIcon, EyeOffIcon } from "@/components/common/Icons";
import { focusRing } from "@/components/common/uiStyles";
import TextField from "./TextField";

// Password input + show/hide button
const PasswordField = forwardRef(function PasswordField(props, ref) {
  const [visible, setVisible] = useState(false);
  const ToggleIcon = visible ? EyeOffIcon : EyeIcon;

  return (
    <TextField
      ref={ref}
      icon={LockIcon}
      type={visible ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className={`grid h-9 w-9 place-items-center rounded-lg text-(--text-secondary) transition-colors hover:bg-(--border-light) hover:text-(--text-primary) ${focusRing}`}
        >
          <ToggleIcon className="h-4.5 w-4.5" />
        </button>
      }
      {...props}
    />
  );
});

export default PasswordField;
