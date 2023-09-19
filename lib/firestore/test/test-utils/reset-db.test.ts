import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { initializeDb } from '@test-utils/initialize-db'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('resets the db - use only when needed', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('resets the db', async () => {
    // await resetDb()
    await initializeDb()
    await expect(Promise.resolve(true)).resolves.toBeDefined()
  })
})
