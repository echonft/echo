import { fetchCollectionDetailsResponseSchema } from '@echo/pallet/validators/fetch-collection-details-response-schema'
import { z } from 'zod'

export type FetchCollectionDetailsResponse = z.infer<typeof fetchCollectionDetailsResponseSchema>
