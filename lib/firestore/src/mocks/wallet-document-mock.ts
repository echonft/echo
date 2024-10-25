import type { WalletDocument } from '@echo/firestore/types/model/wallet-document'
import { walletMockCrew, walletMockJohnny } from '@echo/model/mocks/wallet-mock'

export const walletDocumentMockCrew: Omit<WalletDocument, 'userId'> = walletMockCrew

export const walletDocumentMockJohnny: Omit<WalletDocument, 'userId'> = walletMockJohnny
