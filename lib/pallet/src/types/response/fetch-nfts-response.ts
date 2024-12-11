import type { fetchNftsResponseSchema } from '@echo/pallet/validators/fetch-nfts-response-schema'
import { z } from 'zod'

export type FetchNftsResponse = z.infer<typeof fetchNftsResponseSchema>
