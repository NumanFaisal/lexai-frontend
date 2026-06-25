'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAppDispatch } from '@/store';
import { setActiveDocument } from '@/store/slices/documentsSlice';
import { MOCK_DOCUMENTS } from '@/lib/mock-data';
import toast from 'react-hot-toast';

export default function DocumentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const documentId = params.documentId as string;

  useEffect(() => {
    // Check if document exists
    const doc = MOCK_DOCUMENTS.find((d) => d.id === documentId);
    if (doc) {
      dispatch(setActiveDocument(documentId));
      router.replace(`/documents?doc=${documentId}`);
    } else {
      toast.error('Document not found');
      router.replace('/documents');
    }
  }, [documentId, dispatch, router]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-[13px] text-text-muted">Loading document...</div>
    </div>
  );
}
