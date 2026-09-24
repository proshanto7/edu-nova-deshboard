"use client";

import { useEffect, useRef } from "react";

// focusOnMount: step bodolale screen reader user jate notun heading pay
export default function AuthHeading({ title, children, focusOnMount = false }) {
  const ref = useRef(null);

  useEffect(() => {
    if (focusOnMount) ref.current?.focus();
  }, [focusOnMount]);

  return (
    <div>
      <h1
        ref={ref}
        tabIndex={focusOnMount ? -1 : undefined}
        className="text-[1.75rem] leading-tight font-semibold tracking-tight text-(--text-primary) outline-none sm:text-3xl"
      >
        {title}
      </h1>
      {children && (
        <p className="mt-2 text-base leading-relaxed text-(--text-secondary)">
          {children}
        </p>
      )}
    </div>
  );
}
