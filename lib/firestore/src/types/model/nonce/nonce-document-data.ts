import type { WithId } from '@echo/model/types/with-id'

export interface NonceDocumentData extends WithId {
  nonce: string
  expiresAt: number
  userId: string
}
