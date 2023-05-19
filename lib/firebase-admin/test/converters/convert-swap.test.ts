import { swapFirestoreData } from '../../../mocks/src/swap/swap-firestore-data'
import { getFirestoreSwapData } from '../../src/data/swap/get-firestore-swap-data'
import { describe, expect, it } from '@jest/globals'

describe('convertSwap', () => {
  it('swap conversion', async () => {
    const swap = await getFirestoreSwapData('hS6KtAJ03bSolumoHvDJ')
    expect(swap).toEqual(swapFirestoreData['hS6KtAJ03bSolumoHvDJ']!)
  })
})
