import { baseCollectionResponseSchema } from '@echo/nft-scan/validators/collection-response-schema'
import { z } from 'zod'

export type CollectionResponse = z.infer<typeof baseCollectionResponseSchema>
