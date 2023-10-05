import { dateIsPast } from '@echo/firestore/helpers/converters/from-firestore/date-is-past'
import dayjs from 'dayjs'

export function dateNumberIsPast(date: number) {
  return dateIsPast(dayjs.unix(date))
}
