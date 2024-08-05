import type { nftResponseSchema } from '@echo/opensea/validators/nft-response-schema'

export type NftResponse = ReturnType<typeof nftResponseSchema.parse>
