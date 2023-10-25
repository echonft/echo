import { signatureSchema } from '@echo/frontend/lib/server/validators/signature-schema'
import { z } from 'zod'

export const completeOfferSchema = z.object({
  transactionId: signatureSchema
})
