export interface Nonce {
  id: string
  nonce: string
  expired: boolean
  expiresAt: number
  userId: string
}
