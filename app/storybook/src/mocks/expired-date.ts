import dayjs from 'dayjs'

export function expiredDate(): number {
  return dayjs().subtract(2, 'd').unix()
}
