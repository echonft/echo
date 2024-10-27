import { dateIsPast } from '@echo/utils/helpers/date-is-past'
import { describe, expect, it } from '@jest/globals'
import dayjs from 'dayjs'

describe('dateIsPast', () => {
  it('returns false if date is in the future', () => {
    const date = dayjs().add(1, 'hour')
    expect(dateIsPast(date)).toBeFalsy()
  })
  it('returns true if date is in the past', () => {
    const date = dayjs().subtract(1, 'hour')
    expect(dateIsPast(date)).toBeTruthy()
  })
})
