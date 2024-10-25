import { ValidatorError } from '@echo/utils/constants/errors/validator-error'
import { type HexString } from '@echo/utils/types/hex-string'
import { string } from 'zod'

export const hexStringSchema = string()
  .regex(new RegExp('^0x?[0-9a-fA-F]+'), { message: ValidatorError.InvalidHexString })
  .transform((arg: string) => arg as HexString)
  .readonly()
