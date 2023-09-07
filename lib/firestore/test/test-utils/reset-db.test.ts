import { tearDownRemoteFirestoreTests } from './tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from './tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('resets the db - use only when needed', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('resets the db', () => {
    // await resetDb()
    expect(true).toBeTruthy()
  })
})
