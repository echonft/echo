import { getFirestoreSwapData } from '../../data/swap/get-firestore-swap-data'
import { swapData } from '../../utils/test/mocks/swap/swap-data'
import { describe, expect, it } from '@jest/globals'

describe('convertSwap', () => {
  it('swap conversion', async () => {
    const swap = await getFirestoreSwapData('hS6KtAJ03bSolumoHvDJ')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(swap).toEqual(swapData['hS6KtAJ03bSolumoHvDJ']!)
  })
})
