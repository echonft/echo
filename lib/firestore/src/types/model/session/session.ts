import type { Dayjs } from 'dayjs'

export interface Session {
  expires: Dayjs
  sessionToken: string
  userId: string
}
