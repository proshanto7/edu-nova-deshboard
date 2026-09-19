"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] transition-colors">
      <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
        Welcome to <span className="text-[var(--accent)]">Edu-Nova</span>
      </h1>
      <p className="text-[var(--text-secondary)] text-lg">
        Redirecting you to login...
      </p>

      <div className="mt-8 w-10 h-10 border-4 border-[var(--border)] border-t-[var(--accent)] rounded-full animate-spin" />
    </div>
  );
}
