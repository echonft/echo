import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'

export const userDocumentMockCrew: UserDocument & Required<Pick<UserDocument, 'wallet'>> = {
  username: userMockCrew.username,
  discord: {
    ...userMockCrew.discord,
    id: 'crew-discord-id'
  },
  wallet: '0xf672715f2ba85794659a7150e8c21f8d157bfe1d'
}
export const userDocumentMockJohnny: UserDocument & Required<Pick<UserDocument, 'wallet'>> = {
  username: userMockJohnny.username,
  discord: {
    ...userMockJohnny.discord,
    id: 'johnny-discord-id'
  },
  wallet: '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e'
}
