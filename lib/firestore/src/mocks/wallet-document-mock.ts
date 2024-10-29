import type { WalletDocument } from '@echo/firestore/types/model/wallet-document'
import { walletMockCrew, walletMockJohnny } from '@echo/model/mocks/wallet-mock'

export const walletDocumentMockCrew: WalletDocument = {
  ...walletMockCrew,
  userId: 'crew-user-id'
}

export const walletDocumentMockJohnny: WalletDocument = {
  ...walletMockJohnny,
  userId: 'johnny-user-id'
}
