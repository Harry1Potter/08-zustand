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