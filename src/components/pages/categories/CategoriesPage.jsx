"use client";

import { useMemo, useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import SearchInput from "@/components/common/SearchInput";
import CategoriesHeader from "./CategoriesHeader";
import CategoryCard from "./CategoryCard";
import CategoriesSkeleton from "./CategoriesSkeleton";
import CategoriesEmptyState from "./CategoriesEmptyState";
import CategoryFormModal from "./CategoryFormModal";

export default function CategoriesPage() {
  const {
    categories,
    loading,
    error,
    addCategory,
    editCategory,
    removeCategory,
  } = useCategories();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [search, setSearch] = useState("");

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
    await removeCategory(id, false);
  } catch (err) {
    if (err.status === 409) {
      const confirmForce = confirm(
        `${err.message}\n\nDelete anyway along with these courses?`
      );
      if (!confirmForce) return;

      try {
        await removeCategory(id, true);
      } catch (err2) {
        alert(err2.message);
      }
      return;
    }
    alert(err.message);
  }
};
  // Search: name ba description e match korle dekhabe
  const query = search.trim().toLowerCase();
  const isFiltering = query.length > 0;

  const filteredCategories = useMemo(() => {
    const list = categories ?? [];
    if (!query) return list;
    return list.filter(
      (cat) =>
        cat.name?.toLowerCase().includes(query) ||
        cat.description?.toLowerCase().includes(query),
    );
  }, [categories, query]);

  const total = categories?.length ?? 0;
  const ready = !loading && !error;

  return (
    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
      <CategoriesHeader
        loading={loading}
        total={total}
        visible={filteredCategories.length}
        isFiltering={isFiltering}
        onCreate={openCreate}
      />

      {ready && total > 0 && (
        <div className="mb-5 sm:max-w-sm">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search categories..."
            label="Search categories"
          />
        </div>
      )}

      {loading && <CategoriesSkeleton />}

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-(--danger)/30 bg-(--danger-bg) px-4 py-3 text-sm text-(--danger)"
        >
          {error}
        </div>
      )}

      {ready && filteredCategories.length === 0 && (
        <CategoriesEmptyState
          searchTerm={search}
          onCreate={openCreate}
          onClearSearch={() => setSearch("")}
        />
      )}

      {ready && filteredCategories.length > 0 && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredCategories.map((cat) => (
            <CategoryCard
              key={cat._id}
              category={cat}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </ul>
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
