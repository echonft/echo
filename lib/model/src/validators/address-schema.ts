import type { Address } from '@echo/model/types/address'
import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { ValidatorError } from '@echo/utils/constants/errors/validator-error'
import { type HexString } from '@echo/utils/types/hex-string'
import { isAddress } from '@echo/web3/helpers/is-address'
import { partialRight, toLower } from 'ramda'

export const addressSchema = hexStringSchema
  .refine(partialRight(isAddress, [{ strict: false }]), ValidatorError.InvalidAddress)
  .transform<Address>(toLower<HexString>)
