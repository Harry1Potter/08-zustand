import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note — NoteHub",
  description: "Create a new note in NoteHub using tags and descriptions.",
  openGraph: {
    title: "Create Note — NoteHub",
    description: "Create a new note in NoteHub using tags and descriptions.",
    url: "https://08-zustand-oom2xdb7h-harry1potters-projects.vercel.app/notes/action/create",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}