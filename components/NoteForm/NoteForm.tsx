"use client";

import css from "./NoteForm.module.css";
import { useState, useEffect } from "react";
import { useNoteStore, initialDraft, NoteTag } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNote } from "@/lib/api";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const [formData, setFormDataState] = useState(initialDraft);

  useEffect(() => {
  const hasDraft =
    draft.title.trim() !== "" || draft.content.trim() !== "";

  setFormDataState(hasDraft ? draft : initialDraft);
}, [draft]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormDataState(updated);

    setDraft({ [name]: value } as Partial<typeof draft>);
  }

  const mutation = useMutation({
    mutationFn: (newNote: {
      title: string;
      content: string;
      tag: NoteTag;
    }) => addNote(newNote),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });

      clearDraft();
      router.back();
    },

    onError: (err) => {
      console.error("Failed to create note:", err);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    mutation.mutate({
      title: formData.title,
      content: formData.content,
      tag: formData.tag as NoteTag,
    });
  }

  function handleCancel() {
    router.back();
  }

  const isPending = mutation.isPending;

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className={css.input}
          required
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={formData.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={formData.tag}
          onChange={handleChange}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
          disabled={isPending}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}

