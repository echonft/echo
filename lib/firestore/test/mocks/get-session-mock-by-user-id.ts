import { sessionMock } from '@echo/firestore-mocks/session-mock'

export const getSessionMockByUserId = (userId: string) => sessionMock[userId]!
