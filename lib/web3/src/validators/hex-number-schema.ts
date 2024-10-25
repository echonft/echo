import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { hexToNumber } from 'viem'

export const hexNumberSchema = hexStringSchema.transform((val) => hexToNumber(val)).readonly()
