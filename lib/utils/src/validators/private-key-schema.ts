import { string } from 'zod'

export const privateKeySchema = string()
  .base64()
  .transform((value) => Buffer.from(value, 'base64').toString('ascii'))
