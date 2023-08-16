import { NonceDocumentData } from '../../src/types/model/document-data/nonce-document-data'
import { DocumentReference } from 'firebase-admin/firestore'

export const nonceReferenceMock: { [key: string]: DocumentReference<NonceDocumentData> } = {
  MvPWeuPjRgvGJmPBnyR7: {
    id: 'MvPWeuPjRgvGJmPBnyR7',
    path: 'nonces/MvPWeuPjRgvGJmPBnyR7'
  } as unknown as DocumentReference<NonceDocumentData>
}
