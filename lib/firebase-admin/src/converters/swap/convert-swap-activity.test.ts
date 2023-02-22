import { getFirestoreSwapActivityData } from '../../data/swap/get-firestore-swap-activity-data'
import { swapData } from '../../utils/test/mocks/swap/swap-data'
import { describe, expect, it } from '@jest/globals'
import { equals, pipe, prop } from 'ramda'

describe('convertSwapActivity', () => {
  it('correct conversion', async () => {
    const swapActivity = await getFirestoreSwapActivityData('hS6KtAJ03bSolumoHvDJ', 'ZyufQpi7evabehDReS0Q')
    expect(swapActivity).toEqual(
      swapData['hS6KtAJ03bSolumoHvDJ']!.activities.data!.find(pipe(prop('id'), equals('ZyufQpi7evabehDReS0Q')))
    )
  })
})
