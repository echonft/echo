import type { fetchNftsResponseSchema } from '@echo/opensea/validators/fetch-nfts-response-schema'
import { z } from 'zod'

export type FetchNftsResponse = z.infer<typeof fetchNftsResponseSchema>
