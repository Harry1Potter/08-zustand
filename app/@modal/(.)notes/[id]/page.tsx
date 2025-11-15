import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from './NotePreview.client';

//===========================================================================

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

//===========================================================================

async function NotePreview({ params }: NotePreviewProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}

export default NotePreview;