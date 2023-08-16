import { FirestoreSnapshot } from '../../src/types/abstract/firestore-snapshot'
import { SwapDocumentData } from '../../src/types/model/document-data/swap-document-data'
import { swapDocumentDataMock } from './swap-document-data-mock'
import { swapReferenceMock } from './swap-reference-mock'

export const swapSnapshotMock: { [key: string]: FirestoreSnapshot<SwapDocumentData> } = {
  hS6KtAJ03bSolumoHvDJ: {
    ref: swapReferenceMock['hS6KtAJ03bSolumoHvDJ']!,
    id: swapReferenceMock['hS6KtAJ03bSolumoHvDJ']!.id,
    exists: true,
    data: () => swapDocumentDataMock['hS6KtAJ03bSolumoHvDJ']
  } as unknown as FirestoreSnapshot<SwapDocumentData>
}
