import { FirestoreSnapshot } from '../../src/types/abstract/firestore-snapshot'
import { ContractDocumentData } from '../../src/types/model/document-data/contract-document-data'
import { contractDocumentDataMock } from './contract-document-data-mock'
import { contractReferenceMock } from './contract-reference-mock'

export const contractSnapshotMock: { [key: string]: FirestoreSnapshot<ContractDocumentData> } = {
  '37dBlwJYahEAKeL0rNP8': {
    ref: contractReferenceMock['37dBlwJYahEAKeL0rNP8']!,
    id: contractReferenceMock['37dBlwJYahEAKeL0rNP8']!.id,
    exists: true,
    data: () => contractDocumentDataMock['37dBlwJYahEAKeL0rNP8']
  } as unknown as FirestoreSnapshot<ContractDocumentData>
}
