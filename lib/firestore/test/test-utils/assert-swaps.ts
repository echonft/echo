import { getAllSwaps } from '../../src/crud/swap/get-all-swaps'
import { Swap } from '../../src/types/model/swap'
import { getAllSwapMocks } from '../mocks/get-all-swap-mocks'
import { getSwapMockById } from '../mocks/get-swap-mock-by-id'
import { expect } from '@jest/globals'
import { equals, forEach } from 'ramda'

export async function assertSwaps() {
  const swapMocks = getAllSwapMocks()
  const swaps = await getAllSwaps()
  expect(swaps.length).toEqual(swapMocks.length)
  forEach((swap: Swap) => {
    const swapId = swap.id
    if (!equals(swap, getSwapMockById(swapId))) {
      throw Error(`swap ${swapId} is different from mock`)
    }
  }, swaps)
}
