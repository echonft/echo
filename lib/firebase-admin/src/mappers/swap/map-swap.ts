import { getFirestoreSwapData } from '../../data/swap/get-firestore-swap-data'
import { swaps } from '../../utils/test/mocks/swap/swap'
import { mapSwap } from '@echo/firestore/dist/mappers/swap/map-swap'
import { describe, expect, it } from '@jest/globals'
import { pipe } from 'ramda'

describe('mapSwap', () => {
  it('swap mapping without activities', async () => {
    const swap = await pipe(getFirestoreSwapData, mapSwap)('hS6KtAJ03bSolumoHvDJ', {
      activities: { getDocs: false }
    })
    expect(swap).toEqual(Object.assign({}, swaps['hS6KtAJ03bSolumoHvDJ']!, { activities: undefined }))
  })

  it('swap mapping with activities', async () => {
    const swap = await pipe(getFirestoreSwapData, mapSwap)('hS6KtAJ03bSolumoHvDJ', {
      activities: { getDocs: true }
    })
    expect(swap).toEqual(swaps['hS6KtAJ03bSolumoHvDJ'])
  })
})
