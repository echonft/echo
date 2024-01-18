import type { Wallet } from '@echo/model/types/wallet'

export interface SignNonceArgs {
  domain: string
  uri: string
  nonce: string
  wallet: Wallet
}
