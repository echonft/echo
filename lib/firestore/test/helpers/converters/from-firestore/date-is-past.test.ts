import { dateIsPast } from '../../../../src/helpers/converters/from-firestore/date-is-past'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('helpers - converters - from-firestore - dateIsPast', () => {
  it('returns false if date is in the future', () => {
    const date = dayjs().add(1, 'hour')
    expect(dateIsPast(date)).toBeFalsy()
  })
  it('returns false if the date is now', () => {
    expect(dateIsPast(dayjs())).toBeFalsy()
  })

  it('returns true if date is in the past', () => {
    const date = dayjs().subtract(1, 'hour')
    expect(dateIsPast(date)).toBeTruthy()
  })
})
