import type { fetchNftsResponseSchema } from '@echo/opensea/validators/fetch-nfts-response-schema'

export type FetchNftsResponse = ReturnType<typeof fetchNftsResponseSchema.parse>
