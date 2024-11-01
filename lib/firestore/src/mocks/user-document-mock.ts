import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import { walletMockCrew, walletMockJohnny } from '@echo/model/mocks/wallet-mock'

export const userDocumentMockCrew: UserDocument & Required<Pick<UserDocument, 'wallet'>> = {
  username: userMockCrew.username,
  discord: {
    ...userMockCrew.discord,
    id: 'crew-discord-id'
  },
  wallet: walletMockCrew
}
export const userDocumentMockJohnny: UserDocument & Required<Pick<UserDocument, 'wallet'>> = {
  username: userMockJohnny.username,
  discord: {
    ...userMockJohnny.discord,
    id: 'johnny-discord-id'
  },
  wallet: walletMockJohnny
}
