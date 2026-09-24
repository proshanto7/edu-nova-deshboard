"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/components/common/ThemeToggle";

const ADMIN_LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/categories", label: "Categories" },
  { href: "/dashboard/courses", label: "Courses" },
  { href: "/dashboard/students", label: "Students" },
  { href: "/dashboard/enrollment-requests", label: "Enrollment Requests" },
  { href: "/dashboard/mentors", label: "Mentors" },
  // { href: "/dashboard/activity-log", label: "Activity Log" },
  { href: "/dashboard/settings", label: "Settings" },
];

const STUDENT_LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/courses", label: "My Courses" },
  { href: "/dashboard/progress", label: "My Progress" },
  { href: "/dashboard/certificates", label: "Certificates" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function Sidebar({ open = false, onClose = () => {} }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const links = user?.role === "admin" ? ADMIN_LINKS : STUDENT_LINKS;

  // "/dashboard" shudhu exact match e active; baki gula nested page (e.g. /courses/123) e-o active thakbe
  const isLinkActive = (href) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = () => {
    onClose();
    logout();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed top-0 left-0 z-50 flex h-dvh w-64 shrink-0 flex-col justify-between overflow-y-auto border-r border-(--border) bg-(--sidebar-bg) p-4 transition-transform duration-200 lg:sticky lg:z-auto lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="mb-6 flex items-center justify-between px-2">
            <span className="text-lg font-bold text-(--text-primary)">Edu-Nova</span>

            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-lg p-2 text-(--text-secondary) transition-colors hover:bg-(--border-light) lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {links.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-(--sidebar-active-bg) text-(--sidebar-active-text)"
                      : "text-(--text-secondary) hover:bg-(--border-light)"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 rounded-lg px-4 py-2 text-left text-sm font-medium text-(--danger) transition-colors hover:bg-(--danger-bg)"
        >
          Logout
        </button>
      </aside>
    </>
  );
}