import Link from "next/link";
import ThemeToggle from "@/components/common/ThemeToggle";
import { BookIcon } from "@/components/common/Icons";
import { focusRing } from "@/components/common/uiStyles";
import LearningPath from "./LearningPath";

function Logo({ className = "", light = false }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 rounded-lg ${focusRing} ${className}`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-(--accent) text-(--accent-text)">
        <BookIcon className="h-4 w-4" />
      </span>
      <span
        className={`text-lg font-semibold tracking-tight ${
          light ? "text-white" : "text-(--text-primary)"
        }`}
      >
        Edu-Nova
      </span>
    </Link>
  );
}

/**
 * Login + Forgot Password — duita page-er common layout.
 * lg+ : bam e dark brand panel, dan e form
 * mobile/tablet : panel nei, upore compact logo + theme toggle
 */
export default function AuthShell({ children }) {
  return (
    <div className="min-h-dvh bg-background font-sans text-(--text-primary) lg:grid lg:grid-cols-[5fr_6fr]">
      <aside className="hidden flex-col justify-between bg-[#0a1220] p-12 text-[#e8eef8] lg:flex xl:p-16">
        <Logo light />

        <div className="flex flex-1 items-center py-10">
          <LearningPath className="w-full max-w-lg" />
        </div>

        <div>
          <p className="max-w-md text-4xl leading-[1.1] font-semibold tracking-tight text-white xl:text-5xl">
            Pick up where you left off.
          </p>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-[#8a99b3]">
            Your courses, lessons and mentors are right where you left them.
          </p>
        </div>
      </aside>

      <div className="flex min-h-dvh min-w-0 flex-col">
        <header className="flex items-center justify-between px-5 py-4 sm:px-8 lg:justify-end lg:px-10 lg:py-6">
          <Logo className="lg:hidden" />
          <ThemeToggle />
        </header>

        <main className="flex flex-1 items-start justify-center px-5 pt-6 pb-16 sm:items-center sm:px-8 sm:pt-0">
          <div className="w-full max-w-104">{children}</div>
        </main>
      </div>
    </div>
  );
}
