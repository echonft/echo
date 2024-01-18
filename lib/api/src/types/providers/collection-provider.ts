import type { CollectionProviderResult } from '@echo/api/types/providers/collection-provider-result'

export type CollectionProvider = () => Promise<CollectionProviderResult[]>
