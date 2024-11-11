import { baseNftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { z } from 'zod'

export type NftResponse = z.infer<typeof baseNftResponseSchema>
