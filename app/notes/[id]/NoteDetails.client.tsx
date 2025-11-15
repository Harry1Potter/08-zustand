"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";

export default function NoteDetailsClient({ noteId }: { noteId: string }) {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <div>
      <div>
        <div>
          <h2>{note.title}</h2>
        </div>
        <p>{note.content}</p>
        <p>{note.createdAt}</p>
      </div>
    </div>
  );
}