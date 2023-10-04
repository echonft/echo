import { expectDateIs } from '@echo/test-utils/expect-date-is'
import dayjs from 'dayjs'

export function expectDateNumberIs(dateNumber: number) {
  return expectDateIs(dayjs.unix(dateNumber))
}
