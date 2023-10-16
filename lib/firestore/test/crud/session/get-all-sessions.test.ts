import { getAllSessions } from '@echo/firestore/crud/session/get-all-sessions'
import { Session } from '@echo/firestore/types/model/session/session'
import { getAllSessionMocks } from '@echo/firestore-mocks/session/get-all-session-mocks'
import { getSessionMockByUserId } from '@echo/firestore-mocks/session/get-session-mock-by-user-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
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
