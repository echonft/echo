import { Dayjs } from 'dayjs'

export interface FirestoreNonce {
  id: string
  nonce: string
  expired: boolean
  expiresAt: Dayjs
  userId: string
}
