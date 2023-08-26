import { findSwapById } from '../../../src/crud/swap/find-swap-by-id'
import { getSwapMockById } from '../../mocks/get-swap-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - swap - findSwapById', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('returns undefined if the swap is not found', async () => {
    const user = await findSwapById('not-found')
    expect(user).toBeUndefined()
  })

  it('returns the swap with the given id', async () => {
    const user = await findSwapById('hS6KtAJ03bSolumoHvDJ')
    expect(user).toStrictEqual(getSwapMockById('hS6KtAJ03bSolumoHvDJ'))
  })
})
