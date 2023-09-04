import dayjs from 'dayjs'

export function dateIsPast(date: dayjs.Dayjs) {
  return date.isBefore(dayjs())
}
