import { base64DecodeSchema } from '@echo/model/validators/base64-decode-schema'
import { object, string } from 'zod'

export const credentialsSchema = object({
  code: string().min(1).optional(),
  csrfToken: string().min(1),
  message: base64DecodeSchema,
  signature: base64DecodeSchema
})
