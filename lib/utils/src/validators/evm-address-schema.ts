import { type HexString } from '@echo/utils/types/hex-string'
import { hexStringSchema } from '@echo/utils/validators/hex-string-schema'
import { isAddress } from '@echo/web3/helpers/is-address'
import { toLower } from 'ramda'

export const evmAddressSchema = hexStringSchema.refine(isAddress, 'Invalid Address').transform(toLower<HexString>)
