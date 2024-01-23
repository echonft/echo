import { signatureSchema } from '@echo/frontend/lib/validators/signature-schema'
import { z } from 'zod'

export const acceptOfferSchema = z.object({
  signature: signatureSchema
})
