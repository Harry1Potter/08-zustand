import type { Metadata } from "next";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface Params {
  id: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;

  const note = await fetchNoteById(id);

  const title = note.title ? `NoteHub — ${note.title}` : "NoteHub — Нотатка";
  const rawContent = (note.content ?? "").trim();
  const description =
    rawContent.length > 0 ? (rawContent.slice(0, 160) + (rawContent.length > 160 ? "..." : "")) : "Деталі нотатки в NoteHub.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/notes/${id}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}
