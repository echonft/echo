import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { walletMock } from '@echo/firestore-mocks/wallet-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export const getAllWalletMocks = () => Object.values(walletMock) as NonEmptyArray<FirestoreWallet>
