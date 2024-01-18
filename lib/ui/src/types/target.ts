import type { CollectionProviderResult } from '@echo/api/types/providers/collection-provider-result'
import type { ListingTarget } from '@echo/model/types/listing-target'

export type Target = Omit<ListingTarget, 'collection'> & Record<'collection', CollectionProviderResult>
