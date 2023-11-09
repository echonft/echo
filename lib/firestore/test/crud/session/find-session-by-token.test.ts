import { findSessionByToken } from '@echo/firestore/crud/session/find-session-by-token'
import { getSessionMockByUserId } from '@echo/firestore-mocks/session/get-session-mock-by-user-id'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - session - findSessionByToken', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the session is not found', async () => {
    const session = await findSessionByToken('not-found')
    expect(session).toBeUndefined()
  })

  it('returns the session for the given token', async () => {
    const session = await findSessionByToken('token')
    expect(session).toStrictEqual(getSessionMockByUserId('6rECUMhevHfxABZ1VNOm'))
  })
})
