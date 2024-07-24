import { EXPIRATIONS } from '@echo/model/constants/expiration'
import type { Expiration } from '@echo/model/types/expiration'
import { isIn } from '@echo/utils/fp/is-in'
import { string } from 'zod'

export const expirationSchema = string()
  .refine<string>(function (arg: string): arg is string {
    return isIn(EXPIRATIONS, arg)
  }, 'Invalid expiration')
  .transform((value) => value as Expiration)
