import type { NonceDocumentData } from '@echo/firestore/types/model/nonce/nonce-document-data'

export interface Nonce extends NonceDocumentData {
  expired: boolean
}
