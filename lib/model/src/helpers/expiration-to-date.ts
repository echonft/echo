import { Expiration } from '@echo/model/constants/expiration'
import dayjs, { Dayjs } from 'dayjs'

export function expirationToDate(expiration: Expiration): Dayjs {
  switch (expiration) {
    case Expiration.OneDay:
      return dayjs().add(1, 'day')
    case Expiration.ThreeDays:
      return dayjs().add(3, 'day')
    case Expiration.SevenDays:
      return dayjs().add(7, 'day')
  }
}
