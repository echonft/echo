import { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import { getAllWalletMocks } from '@echo/firestore-mocks/wallet/get-all-wallet-mocks'
import { find, propEq } from 'ramda'

export function getWalletMockByUserId(userId: string) {
  const mocks = getAllWalletMocks()
  return find(propEq(userId, 'userId'), mocks) as FirestoreWallet
}
