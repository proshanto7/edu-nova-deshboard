"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background transition-colors">
      <h1 className="text-4xl sm:text-5xl font-bold text-(--text-primary) mb-4">
        Welcome to <span className="text-(--accent)">Edu-Nova</span>
      </h1>
      <p className="text-(--text-secondary) text-lg">
        Redirecting you to login...
      </p>

      <div className="mt-8 w-10 h-10 border-4 border-(--border) border-t-(--accent) rounded-full animate-spin" />
    </div>
  );
}
