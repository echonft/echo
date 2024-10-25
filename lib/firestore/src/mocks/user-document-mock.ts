import type { UserDocument } from '@echo/firestore/types/model/user-document'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import { removeNilProps } from '@echo/utils/helpers/remove-nil-props'

export const userDocumentMockCrew: UserDocument = {
  username: userMockCrew.username,
  discord: {
    ...removeNilProps(userMockCrew.discord),
    id: 'crew-discord-id'
  }
}
export const userDocumentMockJohnny: UserDocument = {
  username: userMockJohnny.username,
  discord: {
    ...removeNilProps(userMockJohnny.discord),
    id: 'johnny-discord-id'
  }
}
