import type { Dayjs } from 'dayjs'

export interface FirestoreSwap {
  id: string
  offerId: string
  txId: string
  date: Dayjs
}
