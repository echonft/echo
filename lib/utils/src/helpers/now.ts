import dayjs from 'dayjs'

export function now() {
  return dayjs().unix()
}
