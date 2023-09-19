import { WalletResponse } from '@echo/api/types/responses/model/wallet-response'
import { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { pick } from 'ramda'

export function mapWalletToResponse(wallet: FirestoreWallet) {
  return pick(['address', 'chainId'], wallet) as WalletResponse
}
