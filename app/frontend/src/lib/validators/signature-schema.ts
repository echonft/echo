import { type HexString } from '@echo/utils/types/hex-string'
import { z } from 'zod'

const signatureRegex = new RegExp('^0x?[0-9a-fA-F]+')
export const signatureSchema = z
  .string()
  .regex(signatureRegex, { message: 'Invalid signature' })
  .transform((arg: string) => arg as HexString)
