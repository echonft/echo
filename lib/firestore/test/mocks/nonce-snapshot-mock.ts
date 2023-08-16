import { FirestoreSnapshot } from '../../src/types/abstract/firestore-snapshot'
import { NonceDocumentData } from '../../src/types/model/document-data/nonce-document-data'
import { contractDocumentDataMock } from './contract-document-data-mock'
import { nonceReferenceMock } from './nonce-reference-mock'

export const nonceSnapshotMock: { [key: string]: FirestoreSnapshot<NonceDocumentData> } = {
  MvPWeuPjRgvGJmPBnyR7: {
    ref: nonceReferenceMock['MvPWeuPjRgvGJmPBnyR7']!,
    id: nonceReferenceMock['MvPWeuPjRgvGJmPBnyR7']!.id,
    exists: true,
    data: () => contractDocumentDataMock['MvPWeuPjRgvGJmPBnyR7']
  } as unknown as FirestoreSnapshot<NonceDocumentData>
}
