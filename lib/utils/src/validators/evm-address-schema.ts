import { ValidatorError } from '@echo/utils/constants/errors/validator-error'
import { type HexString } from '@echo/utils/types/hex-string'
import { hexStringSchema } from '@echo/utils/validators/hex-string-schema'
import { partialRight, toLower } from 'ramda'
import { isAddress } from 'viem'

export const evmAddressSchema = hexStringSchema
  .refine(partialRight(isAddress, [{ strict: false }]), ValidatorError.InvalidAddress)
  .transform(toLower<HexString>)
