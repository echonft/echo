import { getAllWalletMocks } from '@echo/firestore-mocks/wallet/get-all-wallet-mocks'
import { filter, propEq } from 'ramda'

export function getWalletMocksByUserId(userId: string) {
  const mocks = getAllWalletMocks()
  return filter(propEq(userId, 'userId'), mocks)
}
