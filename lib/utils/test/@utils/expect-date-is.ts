import { expect } from '@jest/globals'
import dayjs from 'dayjs'

export function expectDateIs(dateA: dayjs.Dayjs) {
  return function (dateB: dayjs.Dayjs) {
    expect(dateA.isAfter(dateB.subtract(1, 'minute'))).toBeTruthy()
    expect(dateA.isBefore(dateB.add(1, 'minute'))).toBeTruthy()
  }
}
