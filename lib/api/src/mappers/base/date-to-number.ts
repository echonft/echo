import { Dayjs } from 'dayjs'
import { call, invoker, isNil, unless } from 'ramda'

/**
 * Maps a date (DayJS) to number. If date is undefined, returns undefined
 * @param date
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const dateToNumber: (date: Dayjs | undefined) => number | undefined = unless(isNil, call(invoker(0, 'unix')))
