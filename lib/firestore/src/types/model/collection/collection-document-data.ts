import type { Collection } from '@echo/model/types/collection'

export type CollectionDocumentData = Omit<Collection, 'swapsCount'>
