import type { DocumentData } from 'firebase-admin/firestore'

export interface SwapDocumentData extends DocumentData {
  offerId: string
  transactionId: string
}
