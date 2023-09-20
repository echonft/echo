import type { Dayjs } from 'dayjs'

export interface FirestoreSession {
  expires: Dayjs
  sessionToken: string
  userId: string
}
