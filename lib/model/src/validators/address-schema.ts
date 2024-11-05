import type { HexString } from '@echo/model/types/hex-string'
import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { ValidatorError } from '@echo/utils/constants/errors/validator-error'
import { isAddress } from '@echo/web3/helpers/is-address'
import { toLower } from 'ramda'

function validate(value: string): value is HexString {
  return isAddress(value, { strict: false })
}

export const addressSchema = hexStringSchema
  .refine<HexString>(validate, () => ({
    message: ValidatorError.InvalidAddress
  }))
  .transform(toLower<HexString>)
