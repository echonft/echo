import { getAllSessions } from '@echo/firestore/crud/session/get-all-sessions'
import { FirestoreSession } from '@echo/firestore/types/model/firestore-session'
import { getAllSessionMocks } from '@echo/firestore-mocks/get-all-session-mocks'
import { getSessionMockByUserId } from '@echo/firestore-mocks/get-session-mock-by-user-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { forEach } from 'ramda'

describe('CRUD - session - getAllSessions', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('get all sessions', async () => {
    const sessionMocks = getAllSessionMocks()
    const sessions = await getAllSessions()
    expect(sessions.length).toEqual(sessionMocks.length)
    forEach((session: FirestoreSession) => {
      expect(getSessionMockByUserId(session.userId)).toStrictEqual(session)
    }, sessions)
  })
})
