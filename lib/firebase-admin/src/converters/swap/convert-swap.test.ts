import { getFirestoreSwapData } from '../../data/swap/get-firestore-swap-data'
import { swapData } from '../../utils/test/mocks/swap/swap-data'
import { describe, expect, it } from '@jest/globals'

describe('convertSwap', () => {
  it('swap conversion without activities', async () => {
    const swap = await getFirestoreSwapData('hS6KtAJ03bSolumoHvDJ', {
      activities: {
        getDocs: false
      }
    })
    expect(swap).toEqual(
      Object.assign({}, swapData['hS6KtAJ03bSolumoHvDJ']!, {
        activities: {
          path: 'swaps/hS6KtAJ03bSolumoHvDJ/activities',
          data: undefined
        }
      })
    )
  })

  it('swap conversion with activities', async () => {
    const swap = await getFirestoreSwapData('hS6KtAJ03bSolumoHvDJ', {
      activities: {
        getDocs: true
      }
    })
    expect(swap).toEqual(swapData['hS6KtAJ03bSolumoHvDJ']!)
  })

  // TODO test constraints
})
