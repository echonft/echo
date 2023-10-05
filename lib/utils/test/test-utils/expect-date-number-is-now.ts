import { expectDateIsNow } from '@echo/test-utils/expect-date-is-now'
import dayjs from 'dayjs'

export function expectDateNumberIsNow(date: number) {
  expectDateIsNow(dayjs.unix(date))
}
