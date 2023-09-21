import { FirestoreSession } from '@echo/firestore/types/model/session/firestore-session'
import { getAllSessionMocks } from '@echo/firestore-mocks/session/get-all-session-mocks'
import { find, propEq } from 'ramda'

export function getSessionMockByUserId(userId: string) {
  const mocks = getAllSessionMocks()
  return find(propEq(userId, 'userId'), mocks) as FirestoreSession
}
