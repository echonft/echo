import { dateIsPast } from './date-is-past'
import dayjs from 'dayjs'
import { pipe, prop } from 'ramda'

export const getExpiredProp = <T extends Record<'expiresAt', number>>(documentData: T): boolean =>
  pipe(prop('expiresAt'), dayjs.unix, dateIsPast)(documentData)
