import { getFirestoreSwapData } from '../../../src/data/swap/get-firestore-swap-data'
import { swapFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('convertSwap', () => {
  it('swap conversion', async () => {
    const swap = await getFirestoreSwapData('hS6KtAJ03bSolumoHvDJ')
    expect(swap).toEqual(swapFirestoreData['hS6KtAJ03bSolumoHvDJ']!)
  })
})
