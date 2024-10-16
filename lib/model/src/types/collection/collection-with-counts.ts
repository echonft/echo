import type { Collection } from '@echo/model/types/collection/collection'
import type { WithCounts } from '@echo/model/types/with-counts'

export interface CollectionWithCounts extends Collection, WithCounts {}
