import { getFirestoreSwapData } from '../../data/swap/get-firestore-swap-data'
import { swaps } from '../../utils/test/mocks/swap/swap'
import { mapSwap } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { pipe } from 'ramda'

describe('mapSwap', () => {
  it('swap mapping', async () => {
    const swap = await pipe(getFirestoreSwapData, mapSwap)('hS6KtAJ03bSolumoHvDJ')
    expect(swap).toEqual(swaps['hS6KtAJ03bSolumoHvDJ'])
  })
})
