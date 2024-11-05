import { ValidatorError } from '@echo/utils/constants/errors/validator-error'
import { as } from '@echo/utils/helpers/as'
import { string } from 'zod'

export const hexStringSchema = string()
  .regex(new RegExp('^0x?[0-9a-fA-F]+'), { message: ValidatorError.InvalidHexString })
  .transform(as<`0x${string}`>)
