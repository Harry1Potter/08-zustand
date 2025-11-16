"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { Note, NoteTag } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";

interface NotesClientProps {
  tag: string;
}

function useDebounce<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // ⏳ Debounced search
  const debouncedSearch = useDebounce(search, 400);

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
        tag: tag === "all" ? undefined : (tag as NoteTag),
        page,
        perPage: 10,
      }),
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Failed to load notes.</p>;

  const notes: Note[] = data?.notes ?? [];

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <SearchBox onValueChange={handleSearchChange} />

        <Link
          href="/notes/action/create"
          className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
        >
          Create note +
        </Link>
      </div>

      <NoteList notes={notes} />

      <Pagination
        currentPage={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
      />
    </div>
  );
}
