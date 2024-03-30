import type { Collection } from '@echo/model/types/collection'
import type { ListingTarget } from '@echo/model/types/listing-target'

export type Target = Omit<ListingTarget, 'collection'> & Record<'collection', Collection>
