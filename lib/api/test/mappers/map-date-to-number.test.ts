import { dateToNumber } from '../../src/mappers/base/date-to-number'
import { offerFirestoreData } from '../mocks/offer-firestore-data'
import { offers } from '@echo/ui'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapDateToNumber', () => {
  it('if date is valid, returns the date in unix format', () => {
    const offerDate = offers['LyCfl6Eg7JKuD7XJ6IPi']!.createdAt
    const offerDateInNumber = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!.createdAt
    expect(dateToNumber(offerDate)).toEqual(offerDateInNumber)
  })
  it('if date is undefined, returns undefined', () => {
    const offerDate = offers['LyCfl6Eg7JKuD7XJ6IPi']!.postedAt
    const offerDateInNumber = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!.postedAt
    expect(dateToNumber(offerDate)).toEqual(offerDateInNumber)
  })
})
