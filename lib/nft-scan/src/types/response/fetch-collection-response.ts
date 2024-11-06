import { fetchCollectionResponseSchema } from '@echo/nft-scan/validators/fetch-collection-response-schema'
import { z } from 'zod'

export type FetchCollectionResponse = z.infer<typeof fetchCollectionResponseSchema>
