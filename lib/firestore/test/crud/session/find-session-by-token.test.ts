import { findSessionByToken } from '@echo/firestore/crud/session/find-session-by-token'
import { getSessionMockByUserId } from '@echo/firestore-mocks/get-session-mock-by-user-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

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
