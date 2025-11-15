import Link from "next/link";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteMutate, } = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (!notes || notes.length === 0) return <p>No notes yet...</p>;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h3 className={css.title}>{note.title}</h3>
          <p className={css.content}>{note.content}</p>
          <p className={css.tag}>{note.tag}</p>

          <div className={css.actions}>
            <Link href={`/notes/${note.id}`} className={css.viewLink}>
              View details
            </Link>
            <button onClick={() => deleteMutate(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
