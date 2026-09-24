"use client";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-(--background-card) border border-(--border) p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-(--text-primary)">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-(--text-secondary) hover:text-(--text-primary)"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
