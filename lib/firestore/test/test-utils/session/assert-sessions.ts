import { type Session } from '@echo/firestore/types/model/session/session'
import { getAllSessionMocks } from '@echo/firestore-mocks/session/get-all-session-mocks'
import { getSessionMockByUserId } from '@echo/firestore-mocks/session/get-session-mock-by-user-id'
import { expect } from '@jest/globals'
import { getAllSessions } from '@test-utils/session/get-all-sessions'
import { forEach } from 'ramda'

export async function assertSessions() {
  const sessionMocks = getAllSessionMocks()
  const sessions = await getAllSessions()
  expect(sessions.length).toEqual(sessionMocks.length)
  forEach((session: Session) => {
    expect(session).toStrictEqual(getSessionMockByUserId(session.userId))
  }, sessions)
}
