"use client";

import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import SearchInput from "@/components/common/SearchInput";
import Pagination from "@/components/common/Pagination";
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
    page,
    pages,
    total,
    search,
    setSearch,
    addCategory,
    editCategory,
    removeCategory,
    goToPage,
  } = useCategories();

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

  const isFiltering = search.trim().length > 0;
  const ready = !loading && !error;

  return (
    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
      <CategoriesHeader
        loading={loading}
        total={total}
        visible={categories.length}
        isFiltering={isFiltering}
        onCreate={openCreate}
      />

      {(total > 0 || isFiltering) && (
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

      {ready && categories.length === 0 && (
        <CategoriesEmptyState
          searchTerm={search}
          onCreate={openCreate}
          onClearSearch={() => setSearch("")}
        />
      )}

      {ready && categories.length > 0 && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard
              key={cat._id}
              category={cat}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}

      {ready && categories.length > 0 && (
        <Pagination page={page} pages={pages} onPageChange={goToPage} />
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