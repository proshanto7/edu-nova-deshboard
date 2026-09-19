"use client";

import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import CategoryFormModal from "./CategoryFormModal";

export default function CategoriesPage() {
  const { categories, loading, error, addCategory, editCategory, removeCategory } = useCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const openCreate = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  const openEdit = (category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    if (editingCategory) {
      await editCategory(editingCategory._id, formData);
    } else {
      await addCategory(formData);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    try {
      await removeCategory(id);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Categories</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-lg bg-[var(--accent)] text-[var(--accent-text)] font-medium hover:bg-[var(--accent-hover)] transition-colors"
        >
          + New Category
        </button>
      </div>

      {loading && <p className="text-[var(--text-secondary)]">Loading...</p>}
      {error && <p className="text-[var(--danger)]">{error}</p>}

      {!loading && !error && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-[var(--border-light)]">
                <th className="p-3 text-[var(--text-secondary)] font-medium">Icon</th>
                <th className="p-3 text-[var(--text-secondary)] font-medium">Name</th>
                <th className="p-3 text-[var(--text-secondary)] font-medium">Courses</th>
                <th className="p-3 text-[var(--text-secondary)] font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id} className="border-b border-[var(--border-light)] last:border-0">
                  <td className="p-3">
                    {cat.icon?.url && (
                      <img src={cat.icon.url} alt={cat.name} className="w-8 h-8 rounded object-cover" />
                    )}
                  </td>
                  <td className="p-3 text-[var(--text-primary)]">{cat.name}</td>
                  <td className="p-3 text-[var(--text-secondary)]">{cat.courseCount}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => openEdit(cat)}
                      className="text-[var(--accent)] hover:underline text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="text-[var(--danger)] hover:underline text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-[var(--text-muted)]">
                    No categories yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <CategoryFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingCategory}
      />
    </div>
  );
}