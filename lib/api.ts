import axios from "axios";
import type { NewNoteData, Note, NoteTag } from "../types/note";
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

function getAuthHeader() {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;

//==========================================================

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
  totalItems?: number;
  page?: number;
  perPage?: number;
}

export interface FetchNotesParams {
  search?: string;
  tag?: NoteTag | "all";
  page?: number;
  perPage?: number;
}

// ✅ оновлений fetchNotes без 400 Bad Request
export const fetchNotes = async ({
  search = "",
  tag = "all",
  page = 1,
  perPage = 10,
}: FetchNotesParams): Promise<NotesResponse> => {
  const q = search.trim();
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (q.length >= 2) params.search = q;
  if (tag && tag !== "all") params.tag = tag;

  const res = await axios.get<NotesResponse>("/notes", {
    headers: getAuthHeader(),
    params,
  });

  const data = res.data;
  return {
    notes: data.notes ?? [],
    totalPages: data.totalPages ?? 1,
    totalItems: data.totalItems,
    page: data.page ?? page,
    perPage: data.perPage ?? perPage,
  };
};

//==========================================================

export const addNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await axios.post<Note>("/notes", noteData, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = getAuthHeader();
  const res = await axios.get<Note>(`/notes/${id}`, { headers });
  return res.data;
};
