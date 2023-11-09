import { type Session } from '@echo/firestore/types/model/session/session'
import { getAllSessionMocks } from '@echo/firestore-mocks/session/get-all-session-mocks'
import { getSessionMockByUserId } from '@echo/firestore-mocks/session/get-session-mock-by-user-id'
import { getAllSessions } from '@echo/firestore-test/session/get-all-sessions'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('CRUD - session - getAllSessions', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('get all sessions', async () => {
    const sessionMocks = getAllSessionMocks()
    const sessions = await getAllSessions()
    expect(sessions.length).toEqual(sessionMocks.length)
    forEach((session: Session) => {
      expect(getSessionMockByUserId(session.userId)).toStrictEqual(session)
    }, sessions)
  })
})
