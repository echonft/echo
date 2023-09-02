import { expect } from '@jest/globals'
import dayjs from 'dayjs'

export function expectDateIsNow(date: dayjs.Dayjs) {
  const now = dayjs()
  expect(date.isAfter(now.subtract(1, 'minute'))).toBeTruthy()
  expect(date.isBefore(now.add(1, 'minute'))).toBeTruthy()
}
