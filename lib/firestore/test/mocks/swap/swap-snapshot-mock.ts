import type { SwapDocumentData } from '@echo/firestore/types/model/swap/swap-document-data'
import { swapDocumentDataMock } from '@echo/firestore-mocks/swap/swap-document-data-mock'
import { swapReferenceMock } from '@echo/firestore-mocks/swap/swap-reference-mock'
import type { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'

export const swapSnapshotMock: Record<string, QueryDocumentSnapshot<SwapDocumentData>> = {
  '2ipuV3drjQlzEgkUkW7q': {
    ref: swapReferenceMock['2ipuV3drjQlzEgkUkW7q']!,
    id: swapReferenceMock['2ipuV3drjQlzEgkUkW7q']!.id,
    exists: true,
    data: () => swapDocumentDataMock['2ipuV3drjQlzEgkUkW7q']
  } as unknown as QueryDocumentSnapshot<SwapDocumentData>
}
