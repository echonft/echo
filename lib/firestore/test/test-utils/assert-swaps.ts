import { getAllSwaps } from '../../src/crud/swap/get-all-swaps'
import { Swap } from '../../src/types/model/swap'
import { getAllSwapMocks } from '../mocks/get-all-swap-mocks'
import { getSwapMockById } from '../mocks/get-swap-mock-by-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertSwaps() {
  const swapMocks = getAllSwapMocks()
  const swaps = await getAllSwaps()
  expect(swaps.length).toEqual(swapMocks.length)
  forEach((swap: Swap) => {
    expect(getSwapMockById(swap.id)).toStrictEqual(swap)
  }, swaps)
}
