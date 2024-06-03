import { type HexString } from '@echo/utils/types/hex-string'
import { z } from 'zod'

export const hexStringSchema = z
  .string()
  .regex(new RegExp('^0x?[0-9a-fA-F]+'), { message: 'Invalid hex string' })
  .transform((arg: string) => arg as HexString)
