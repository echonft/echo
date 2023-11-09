import { findSessionByUserId } from '@echo/firestore/crud/session/find-session-by-user-id'
import { getSessionMockByUserId } from '@echo/firestore-mocks/session/get-session-mock-by-user-id'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - session - findSessionByUserId', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the session is not found', async () => {
    const session = await findSessionByUserId('not-found')
    expect(session).toBeUndefined()
  })

  it('returns the session for the given user id', async () => {
    const session = await findSessionByUserId('6rECUMhevHfxABZ1VNOm')
    expect(session).toStrictEqual(getSessionMockByUserId('6rECUMhevHfxABZ1VNOm'))
  })
})
