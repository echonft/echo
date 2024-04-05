import { type WalletRequest } from '@echo/api/types/requests/wallet-request'
import { type HexString } from '@echo/utils/types/hex-string'

export interface AddEvmWalletRequest {
  wallet: WalletRequest
  message: string
  signature: HexString
}

export interface AddSolanaWalletRequest {
  publicKey: string
  signature: string
  message: string
}

export type AddWalletRequest = AddEvmWalletRequest | AddSolanaWalletRequest
