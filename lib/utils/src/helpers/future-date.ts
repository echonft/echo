import dayjs from 'dayjs'

export function futureDate() {
  return dayjs().add(1, 'day').unix()
}
