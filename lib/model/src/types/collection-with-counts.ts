import type { Collection } from '@echo/model/types/collection'
import type { Counts } from '@echo/model/types/counts'

export interface CollectionWithCounts extends Collection, Counts {}
