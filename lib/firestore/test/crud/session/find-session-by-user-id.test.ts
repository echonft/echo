import { findSessionByUserId } from '@echo/firestore/crud/session/find-session-by-user-id'
import { getSessionMockByUserId } from '@echo/firestore-mocks/get-session-mock-by-user-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - session - findSessionByUserId', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('returns undefined if the session is not found', async () => {
    const user = await findSessionByUserId('not-found')
    expect(user).toBeUndefined()
  })

  it('returns the session for the given user id', async () => {
    const session = await findSessionByUserId('6rECUMhevHfxABZ1VNOm')
    expect(session).toStrictEqual(getSessionMockByUserId('6rECUMhevHfxABZ1VNOm'))
  })
})
