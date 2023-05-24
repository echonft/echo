/* eslint-disable @typescript-eslint/ban-ts-comment */
import { mapActivityToResponse } from '../map-activity-to-response'
import { OfferActivity, offers, OfferState } from '@echo/model'
import { describe, expect, it } from '@jest/globals'
import { omit, pick } from 'ramda'

describe('mappers - mapOfferActivityToResponse', () => {
  const mockActivity = offers['LyCfl6Eg7JKuD7XJ6IPi']!.activities![0]!
  const expectedResult = {
    date: 1676984897,
    toState: OfferState.OPEN,
    fromState: undefined
  }
  it('valid data passes', () => {
    expect(mapActivityToResponse(mockActivity)).toStrictEqual(expectedResult)
    const activity = { ...mockActivity, fromState: OfferState.EXPIRED }
    const result = { ...expectedResult, fromState: 'EXPIRED' }
    expect(mapActivityToResponse(activity)).toStrictEqual(result)
  })
  it('invalid data passes', () => {
    // @ts-ignore
    const activity: OfferActivity = pick(['date'], mockActivity)
    const result = pick(['date'], expectedResult)
    expect(mapActivityToResponse(activity)).toStrictEqual(result)
  })
  it('invalid data throws', () => {
    // @ts-ignore
    const activity: OfferActivity = omit(['date'], mockActivity)
    try {
      mapActivityToResponse(activity)
      expect(false).toBeTruthy()
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})
