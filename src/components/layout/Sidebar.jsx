"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/components/common/ThemeToggle";

const ADMIN_LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/categories", label: "Categories" },
  { href: "/dashboard/courses", label: "Courses" },
  { href: "/dashboard/students", label: "Students" },
  { href: "/dashboard/activity-log", label: "Activity Log" },
  { href: "/dashboard/settings", label: "Settings" },
];

const STUDENT_LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/courses", label: "My Courses" },
  { href: "/dashboard/progress", label: "My Progress" },
  { href: "/dashboard/certificates", label: "Certificates" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const links = user?.role === "admin" ? ADMIN_LINKS : STUDENT_LINKS;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 border-r border-(--border) bg-(--sidebar-bg) p-4 flex flex-col justify-between transition-colors">
      <div>
        <div className="flex items-center justify-between mb-6 px-2">
          <span className="text-lg font-bold text-(--text-primary)">Edu-Nova</span>
          <ThemeToggle />
        </div>

        <nav className="flex flex-col gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
        className="px-4 py-2 rounded-lg text-sm font-medium text-(--danger) hover:bg-(--danger-bg) transition-colors text-left"
      >
        Logout
      </button>
    </aside>
  );
}