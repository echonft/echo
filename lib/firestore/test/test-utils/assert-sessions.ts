import { getAllSessions } from '@echo/firestore/crud/session/get-all-sessions'
import type { FirestoreSession } from '@echo/firestore/types/model/firestore-session'
import { getAllSessionMocks } from '@echo/firestore-mocks/get-all-session-mocks'
import { getSessionMockByUserId } from '@echo/firestore-mocks/get-session-mock-by-user-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertSessions() {
  const sessionMocks = getAllSessionMocks()
  const sessions = await getAllSessions()
  expect(sessions.length).toEqual(sessionMocks.length)
  forEach((session: FirestoreSession) => {
    expect(session).toStrictEqual(getSessionMockByUserId(session.userId))
  }, sessions)
}
