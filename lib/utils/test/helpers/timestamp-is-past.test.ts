import { futureTimestamp } from '@echo/utils/helpers/future-timestamp'
import { timestampIsPast } from '@echo/utils/helpers/timestamp-is-past'
import { describe, expect, test } from '@jest/globals'
import dayjs from 'dayjs'

describe('timestampIsPast', () => {
  test('returns FALSE if the timestamp is not in the past', () => {
    expect(timestampIsPast(futureTimestamp())).toBeFalsy()
  })

  test('returns TRUE if the timestamp is in the past', () => {
    const pastTimestamp = dayjs().subtract(1, 'second').unix()
    expect(timestampIsPast(pastTimestamp)).toBeTruthy()
  })
})
