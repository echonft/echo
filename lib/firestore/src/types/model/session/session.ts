export interface Session {
  expired: boolean
  expires: number
  sessionToken: string
  userId: string
}
