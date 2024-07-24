import { expirationToDate } from '@echo/model/helpers/expiration-to-date'
import type { Expiration } from '@echo/model/types/expiration'

export function expirationToDateNumber(expiration: Expiration): number {
  return expirationToDate(expiration).unix()
}
