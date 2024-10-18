import { hexStringSchema } from '@echo/utils/validators/hex-string-schema'
import { hexToNumber } from 'viem'

export const hexNumberSchema = hexStringSchema.transform((val) => hexToNumber(val))
