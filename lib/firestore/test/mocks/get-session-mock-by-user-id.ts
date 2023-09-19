import { sessionMock } from '@echo/firestore-mocks/session-mock'

export function getSessionMockByUserId(userId: string) {
  return sessionMock[userId]!
}
