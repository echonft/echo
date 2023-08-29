import dayjs, { Dayjs } from 'dayjs'

export function dateIsPast(date: Dayjs) {
  return date.isBefore(dayjs())
}
