import type { FirestoreSession } from '@echo/firestore/types/model/session/firestore-session'
import { sessionMock } from '@echo/firestore-mocks/session/session-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllSessionMocks() {
  return Object.values(sessionMock) as NonEmptyArray<FirestoreSession>
}
