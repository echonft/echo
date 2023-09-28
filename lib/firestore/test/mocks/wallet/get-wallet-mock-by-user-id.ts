import { getAllWalletMocks } from '@echo/firestore-mocks/wallet/get-all-wallet-mocks'
import { find, propEq } from 'ramda'

export function getWalletMockByUserId(userId: string) {
  const mocks = getAllWalletMocks()
  return find(propEq(userId, 'userId'), mocks)!
}
