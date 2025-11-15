"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(id);
  }, [search]);

  const finalSearch =
    debouncedSearch.trim() !== ""
      ? debouncedSearch
      : tag === "all"
      ? ""
      : tag;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag, debouncedSearch, page],
    queryFn: () =>
      fetchNotes({
        search: finalSearch,
        page: page,
        perPage: 10,
      }),
  });

  const handleSearchChange = (value: string) => setSearch(value);

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Failed to load notes.</p>;

  const notes: Note[] = data?.notes ?? [];

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <SearchBox onValueChange={handleSearchChange} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
        >
          Add Note
        </button>
      </div>

      <NoteList notes={notes} />

      <Pagination
        currentPage={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
