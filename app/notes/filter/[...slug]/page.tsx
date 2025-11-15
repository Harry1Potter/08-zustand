import { fetchNotes } from "@/lib/api";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] || "all";

  const filterName = tag === "all" ? "Усі нотатки" : `Фільтр: ${tag}`;

  return {
    title: `NoteHub — ${filterName}`,
    description: `Сторінка з нотатками за фільтром "${tag}".`,

    openGraph: {
      title: `NoteHub — ${filterName}`,
      description: `Сторінка з нотатками за фільтром "${tag}".`,
      url: `/notes/filter/${tag}`,
      images: [
        "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      ],
    },
  };
}

export default async function FilteredNotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const tag = slug[0] || "all";

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, "", 1],
    queryFn: () =>
      fetchNotes({
        search: tag === "all" ? "" : tag,
        page: 1,
        perPage: 10,
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
