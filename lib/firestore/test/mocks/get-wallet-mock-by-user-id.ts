import { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { getAllWalletMocks } from '@echo/firestore-mocks/get-all-wallet-mocks'
import { find, propEq } from 'ramda'

export function getWalletMockByUserId(userId: string) {
  const mocks = getAllWalletMocks()
  return find(propEq(userId, 'userId'), mocks) as FirestoreWallet
}
