import type { Expiration } from '@echo/model/types/expiration'
import dayjs from 'dayjs'

export function expirationToDate(expiration: Expiration): number {
  switch (expiration) {
    case '1d':
      return dayjs().add(1, 'day').unix()
    case '3d':
      return dayjs().add(3, 'day').unix()
    case '7d':
      return dayjs().add(7, 'day').unix()
  }
}
