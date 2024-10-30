import type { Contract } from '@echo/model/types/contract'

export interface NonceDocument {
  expiresAt: number
  nonce: string
  wallet: Contract
}
