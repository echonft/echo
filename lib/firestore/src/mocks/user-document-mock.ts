import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'

export const userDocumentMockCrew: UserDocument = {
  username: userMockCrew.username,
  discord: {
    ...userMockCrew.discord,
    id: 'crew-discord-id'
  }
}
export const userDocumentMockJohnny: UserDocument = {
  username: userMockJohnny.username,
  discord: {
    ...userMockJohnny.discord,
    id: 'johnny-discord-id'
  }
}
