import { DocumentData } from 'firebase-admin/firestore'

export interface NonceDocumentData extends DocumentData {
  nonce: string
}
