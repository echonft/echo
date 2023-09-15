import type { FirestoreSession } from '@echo/firestore/types/model/firestore-session'
import { sessionMock } from '@echo/firestore-mocks/session-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export const getAllSessionMocks = () => Object.values(sessionMock) as NonEmptyArray<FirestoreSession>
