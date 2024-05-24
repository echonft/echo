import { expectDateIs } from '@echo/utils-test/expect-date-is'
import dayjs from 'dayjs'

export function expectDateIsNow(date: dayjs.Dayjs) {
  expectDateIs(date)(dayjs())
}
