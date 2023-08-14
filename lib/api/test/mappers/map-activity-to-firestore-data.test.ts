/* eslint-disable @typescript-eslint/ban-ts-comment */
import { mapActivityToFirestoreData } from '../../src/mappers/activity/map-activity-to-firestore-data'
import { FirestoreActivityData, FirestoreOfferActivityPrototype } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'
import { omit } from 'ramda'

describe('mappers - mapActivityToFirestoreData', () => {
  const mockActivity: FirestoreOfferActivityPrototype = {
    date: dayjs.unix(1676984897),
    fromState: undefined,
    toState: 'OPEN'
  }
  const expectedResult: FirestoreActivityData = {
    date: 1676984897,
    toState: 'OPEN',
    fromState: undefined
  }
  it('valid data passes', () => {
    expect(mapActivityToFirestoreData(mockActivity)).toStrictEqual(expectedResult)
    const activity: FirestoreOfferActivityPrototype = { ...mockActivity, fromState: 'EXPIRED' }
    const result = { ...expectedResult, fromState: 'EXPIRED' }
    expect(mapActivityToFirestoreData(activity)).toStrictEqual(result)
  })
  it('invalid data throws', () => {
    // @ts-ignore
    const activity: FirestoreOfferActivityPrototype = omit(['date'], mockActivity)
    try {
      mapActivityToFirestoreData(activity)
      expect(false).toBeTruthy()
    } catch (e) {
      expect(e).toBeDefined()
    }
  })
})
