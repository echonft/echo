import { dateIsPast } from '@echo/utils/helpers/date-is-past'
import dayjs from 'dayjs'

export function dateNumberIsPast(date: number) {
  return dateIsPast(dayjs.unix(date))
}
