import { userMock } from '@echo/firestore-mocks/user-mock'

export function getUserMockById(id: string) {
  return userMock[id]!
}
