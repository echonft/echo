import { walletMock } from '@echo/firestore-mocks/wallet-mock'

export const getWalletMockById = (id: string) => walletMock[id]!
