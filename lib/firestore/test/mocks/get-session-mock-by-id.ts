import { sessionMock } from '@echo/firestore-mocks/session-mock'

export function getSessionMockById(id: string) {
  return sessionMock[id]!
}
