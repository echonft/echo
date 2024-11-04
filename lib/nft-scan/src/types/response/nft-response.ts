import { baseNftAttributeResponseSchema, baseNftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { z } from 'zod'

export type NftAttributeResponse = z.infer<typeof baseNftAttributeResponseSchema>

export type NftResponse = z.infer<typeof baseNftResponseSchema>
