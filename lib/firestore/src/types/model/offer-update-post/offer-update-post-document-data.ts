import type { DocumentData } from 'firebase-admin/firestore'

export interface OfferUpdatePostDocumentData extends DocumentData {
  offerUpdateId: string
  postedAt: number
}
