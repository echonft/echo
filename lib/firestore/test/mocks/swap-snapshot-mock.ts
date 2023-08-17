import { SwapDocumentData } from '../../src/types/model/swap-document-data'
import { swapDocumentDataMock } from './swap-document-data-mock'
import { swapReferenceMock } from './swap-reference-mock'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'

export const swapSnapshotMock: { [key: string]: QueryDocumentSnapshot<SwapDocumentData> } = {
  hS6KtAJ03bSolumoHvDJ: {
    ref: swapReferenceMock['hS6KtAJ03bSolumoHvDJ']!,
    id: swapReferenceMock['hS6KtAJ03bSolumoHvDJ']!.id,
    exists: true,
    data: () => swapDocumentDataMock['hS6KtAJ03bSolumoHvDJ']
  } as unknown as QueryDocumentSnapshot<SwapDocumentData>
}
