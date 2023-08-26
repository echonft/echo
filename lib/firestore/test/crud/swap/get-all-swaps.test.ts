import { getAllSwaps } from '../../../src/crud/swap/get-all-swaps'
import { Swap } from '../../../src/types/model/swap'
import { getAllSwapMocks } from '../../mocks/get-all-swap-mocks'
import { getSwapMockById } from '../../mocks/get-swap-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('CRUD - user - getAllUsers', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('get all swaps', async () => {
    const swapMocks = getAllSwapMocks()
    const swaps = await getAllSwaps()
    expect(swaps.length).toEqual(swapMocks.length)
    forEach((swap: Swap) => {
      expect(getSwapMockById(swap.id)).toStrictEqual(swap)
    }, swaps)
  })
})
