import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

interface DraftNote {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialDraft: DraftNote = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteStore {
  draft: DraftNote;
  setDraft: (note: Partial<DraftNote>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
    }
  )
);

export { initialDraft };
