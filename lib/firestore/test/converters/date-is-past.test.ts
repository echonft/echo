import { dateIsPast } from '../../src/helpers/converters/from-firestore/date-is-past'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('converters - dateIsFuture', () => {
  it('returns false if the date is in the future', () => {
    const date = dayjs()
    expect(dateIsPast(date.add(1, 'hour'))).toBeFalsy()
  })

  it('returns false if the date is now', () => {
    expect(dateIsPast(dayjs())).toBeFalsy()
  })

  it('returns true if the date is in the past', () => {
    const date = dayjs()
    expect(dateIsPast(date.subtract(1, 'hour'))).toBeTruthy()
  })
})
