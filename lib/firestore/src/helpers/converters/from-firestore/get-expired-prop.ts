import { dateIsPast } from './date-is-past'
import dayjs from 'dayjs'
import { DocumentData } from 'firebase-admin/firestore'
import { pipe, prop } from 'ramda'

export const getExpiredProp = <T extends DocumentData & Record<'expiresAt', number>>(documentData: T): boolean =>
  pipe(prop('expiresAt'), dayjs.unix, dateIsPast)(documentData)
