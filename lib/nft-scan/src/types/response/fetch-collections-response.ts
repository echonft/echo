import type { fetchCollectionsResponseSchema } from '@echo/nft-scan/validators/fetch-collections-response-schema'
import { z } from 'zod'

export type FetchCollectionsResponse = z.infer<typeof fetchCollectionsResponseSchema>
