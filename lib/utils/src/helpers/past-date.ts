import dayjs from 'dayjs'

export function pastDate() {
  return dayjs().subtract(1, 'day').unix()
}
