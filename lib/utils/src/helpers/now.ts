import dayjs from 'dayjs'

export function now(): number {
  return dayjs().unix()
}
