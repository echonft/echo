import dayjs from 'dayjs'

export function timestampIsPast(timestamp: number): boolean {
  const now = dayjs()
  return dayjs.unix(timestamp).isBefore(now)
}
