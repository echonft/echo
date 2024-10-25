import { hexStringSchema } from '@echo/model/validators/hex-string-schema'
import { trim } from 'viem'

export const topicSchema = hexStringSchema.transform((val) => trim(val)).readonly()
