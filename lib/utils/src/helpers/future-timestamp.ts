import dayjs from 'dayjs'

export function futureTimestamp() {
  return dayjs().add(1, 'day').unix()
}
