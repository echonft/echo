import dayjs from 'dayjs'

export function nowMs(): number {
  return dayjs().valueOf()
}
