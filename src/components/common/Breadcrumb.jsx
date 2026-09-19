import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  return (
    <section className="border-b border-(--border) px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-(--text-muted)">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <span key={item.label} className="flex items-center gap-1.5">
                {isLast || !item.href ? (
                  <span className="text-(--text-primary)">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-(--text-primary)"
                  >
                    {item.label}
                  </Link>
                )}

                {!isLast && <ChevronRight size={12} />}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}