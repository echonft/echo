import { fetchNftsResponseSchema } from '@echo/nft-scan/validators/fetch-nfts-response-schema'
import { z } from 'zod'

export type FetchNftsResponse = z.infer<typeof fetchNftsResponseSchema>
