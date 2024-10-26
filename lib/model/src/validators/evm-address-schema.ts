import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { ValidatorError } from '@echo/utils/constants/errors/validator-error'
import { type HexString } from '@echo/utils/types/hex-string'
import { isAddress } from '@echo/web3/utils/is-address'
import { partialRight, toLower } from 'ramda'

export const evmAddressSchema = hexStringSchema
  .refine(partialRight(isAddress, [{ strict: false }]), ValidatorError.InvalidAddress)
  .transform(toLower<HexString>)
