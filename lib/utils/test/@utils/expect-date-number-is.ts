import { expectDateIs } from '@echo/utils-test/expect-date-is'
import dayjs from 'dayjs'

export function expectDateNumberIs(dateNumber: number) {
  return expectDateIs(dayjs.unix(dateNumber))
}
