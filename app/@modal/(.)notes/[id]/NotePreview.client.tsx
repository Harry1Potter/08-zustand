"use client";

import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";

function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id!),
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  const close = () => router.back();

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        {isLoading ? (
          <p className={css.isLoading}>Loading, please wait...</p>
        ) : isError || !note ? (
          <p className={css.isError}>Something went wrong.</p>
        ) : (
          <>
            <div className={css.item}>
              <div className={css.header}>
                <h2 className={css.title}>{note.title}</h2>
              </div>
              <p className={css.content}>{note.content}</p>
              <p className={css.date}>
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>

            <span className={css.tag}>{note.tag}</span>
          </>
        )}
        <div className={css.action}>
          <button onClick={close}>Close</button>
        </div>
      </div>
    </Modal>
  );
}

export default NotePreviewClient;
