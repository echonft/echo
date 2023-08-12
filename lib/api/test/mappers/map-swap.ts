import { mapSwap } from '../../src/mappers/swap/map-swap'
import { swapFirestoreData } from '../mocks/swap-firestore-data'
import { swaps } from '@echo/ui'
import { describe, expect, it } from '@jest/globals'

describe('mapSwap', () => {
  it('swap mapping', async () => {
    const swap = await mapSwap(Promise.resolve(swapFirestoreData['hS6KtAJ03bSolumoHvDJ']!))
    expect(swap).toEqual(swaps['hS6KtAJ03bSolumoHvDJ'])
  })
})
