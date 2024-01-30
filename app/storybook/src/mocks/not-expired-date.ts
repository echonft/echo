import dayjs from 'dayjs'

export function notExpiredDate(): number {
  return dayjs().add(2, 'd').unix()
}
