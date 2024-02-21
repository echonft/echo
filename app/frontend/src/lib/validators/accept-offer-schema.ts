import { hexStringSchema } from '@echo/frontend/lib/validators/hex-string-schema'
import { z } from 'zod'

export const acceptOfferSchema = z.object({
  signature: hexStringSchema
})
