import { SwapDocumentData } from '../../src/types/model/document-data/swap-document-data'
import { DocumentReference } from 'firebase-admin/firestore'

export const swapReferenceMock: { [key: string]: DocumentReference<SwapDocumentData> } = {
  hS6KtAJ03bSolumoHvDJ: {
    id: 'hS6KtAJ03bSolumoHvDJ',
    path: 'swaps/hS6KtAJ03bSolumoHvDJ'
  } as unknown as DocumentReference<SwapDocumentData>
}
