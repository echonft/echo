import type { Expiration } from '@echo/model/constants/expiration'
import { expirationToDate } from '@echo/model/helpers/expiration-to-date'

export function expirationToDateNumber(expiration: Expiration): number {
  return expirationToDate(expiration).unix()
}
