import { walletMock } from '@echo/firestore-mocks/wallet-mock'

export function getWalletMockById(id: string) {
  return walletMock[id]!
}
