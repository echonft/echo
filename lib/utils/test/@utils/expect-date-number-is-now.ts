import { expectDateIsNow } from '@echo/utils-test/expect-date-is-now'
import dayjs from 'dayjs'

export function expectDateNumberIsNow(date: number) {
  expectDateIsNow(dayjs.unix(date))
}
