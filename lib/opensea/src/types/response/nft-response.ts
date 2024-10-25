import type { nftResponseSchema } from '@echo/opensea/validators/nft-response-schema'
import { z } from 'zod'

export type NftResponse = z.infer<typeof nftResponseSchema>
