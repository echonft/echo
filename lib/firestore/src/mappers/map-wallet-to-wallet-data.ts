import { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import { WalletData } from '@echo/firestore/types/model/wallet/wallet-data'
import { pick } from 'ramda'

export function mapWalletToWalletData(wallet: Partial<FirestoreWallet>): WalletData {
  return pick(['address', 'chainId'])(wallet) as WalletData
}
