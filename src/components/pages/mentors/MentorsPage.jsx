"use client";

import { useMemo, useState } from "react";
import { useMentors } from "@/hooks/useMentors";
import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";
import MentorCard from "./MentorCard";
import MentorsSkeleton from "./MentorsSkeleton";
import MentorsEmptyState from "./MentorsEmptyState";
import MentorFormModal from "./MentorFormModal";

export default function MentorsPage() {
  const {
    mentors,
    loading,
    error,
    addMentor,
    editMentor,
    removeMentor,
    toggleMentorStatus,
  } = useMentors();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState(null);
  const [search, setSearch] = useState("");

  const openCreate = () => {
    setEditingMentor(null);
    setModalOpen(true);
  };

  const openEdit = (mentor) => {
    setEditingMentor(mentor);
    setModalOpen(true);
  };

  const handleSubmit = async (payload) => {
    if (editingMentor) {
      await editMentor(editingMentor._id, payload);
    } else {
      await addMentor(payload);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this mentor?")) return;
    try {
      await removeMentor(id);
    } catch (err) {
      alert(err.message);
    }
  };

  // Search: name ba email e match korle dekhabe
  const query = search.trim().toLowerCase();
  const isFiltering = query.length > 0;

  const filteredMentors = useMemo(() => {
    const list = mentors ?? [];
    if (!query) return list;
    return list.filter(
      (m) =>
        m.name?.toLowerCase().includes(query) ||
        m.email?.toLowerCase().includes(query),
    );
  }, [mentors, query]);

  const total = mentors?.length ?? 0;
  const ready = !loading && !error;

  let subtitle;
  if (loading) subtitle = "Loading mentors...";
  else if (isFiltering)
    subtitle = `Showing ${filteredMentors.length} of ${total}`;
  else subtitle = `${total} ${total === 1 ? "mentor" : "mentors"} in total`;

  return (
    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Mentors"
        subtitle={subtitle}
        actionLabel="New Mentor"
        onAction={openCreate}
      />

      {ready && total > 0 && (
        <div className="mb-5 sm:max-w-sm">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by name or email..."
            label="Search mentors"
          />
        </div>
      )}

      {loading && <MentorsSkeleton />}

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-(--danger)/30 bg-(--danger-bg) px-4 py-3 text-sm text-(--danger)"
        >
          {error}
        </div>
      )}

      {ready && filteredMentors.length === 0 && (
        <MentorsEmptyState
          searchTerm={search}
          onCreate={openCreate}
          onClearSearch={() => setSearch("")}
        />
      )}

      {ready && filteredMentors.length > 0 && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredMentors.map((mentor) => (
            <MentorCard
              key={mentor._id}
              mentor={mentor}
              onEdit={openEdit}
              onDelete={handleDelete}
              onToggleStatus={toggleMentorStatus}
            />
          ))}
        </ul>
      )}

      <MentorFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingMentor}
      />
    </div>
  );
}
