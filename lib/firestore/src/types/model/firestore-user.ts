import type { Dayjs } from 'dayjs'

export interface FirestoreUser {
  id: string
  image: string
  name: string
  updatedAt: Dayjs
}
