import type { SwapDocumentData } from '@echo/firestore/types/model/swap/swap-document-data'
import type { DocumentReference } from 'firebase-admin/lib/firestore'

export const swapReferenceMock: Record<string, DocumentReference<SwapDocumentData>> = {
  '2ipuV3drjQlzEgkUkW7q': {
    id: '2ipuV3drjQlzEgkUkW7q',
    path: 'swaps/2ipuV3drjQlzEgkUkW7q'
  } as unknown as DocumentReference<SwapDocumentData>
}
