import { type Session } from '@echo/firestore/types/model/session/session'
import { sessionMock } from '@echo/firestore-mocks/session/session-mock'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllSessionMocks() {
  return Object.values(sessionMock) as NonEmptyArray<Session>
}
