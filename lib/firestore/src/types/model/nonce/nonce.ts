export interface Nonce {
  expired: boolean
  expiresAt: number
  nonce: string
  userId: string
}
