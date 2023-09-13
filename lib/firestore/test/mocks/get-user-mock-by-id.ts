import { userMock } from '@echo/firestore-mocks/user-mock'

export const getUserMockById = (id: string) => userMock[id]!
