import { string } from 'zod'

export const privateKeySchema = string()
  .min(1)
  .base64()
  .transform((value) => Buffer.from(value, 'base64').toString('ascii'))
  .readonly()
