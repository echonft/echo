import { Dayjs } from 'dayjs'
import { call, invoker, isNil, unless } from 'ramda'

/**
 * Maps a date (DayJS) to number. If date is undefined, returns undefined
 * @param date
 */
export function mapDateToNumber(date: Dayjs | undefined): number | undefined {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-return
  return unless(isNil, call(invoker(0, 'unix')))(date)
}
