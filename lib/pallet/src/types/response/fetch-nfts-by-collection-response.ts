import type { fetchNftsByCollectionResponseSchema } from '@echo/pallet/validators/fetch-nfts-by-collection-response-schema'
import { z } from 'zod'

export type FetchNftsByCollectionResponse = z.infer<typeof fetchNftsByCollectionResponseSchema>
