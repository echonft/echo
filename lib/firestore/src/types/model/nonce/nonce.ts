import { Dayjs } from 'dayjs'

export interface Nonce {
  id: string
  nonce: string
  expired: boolean
  expiresAt: Dayjs
  userId: string
}
