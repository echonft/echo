import { Signature, Wallet } from '../../../../ui-model'
import { SiweMessage } from 'siwe'

export interface WalletRequest {
  wallet: Wallet | Wallet[]
  message?: SiweMessage
  signature?: Signature
}
