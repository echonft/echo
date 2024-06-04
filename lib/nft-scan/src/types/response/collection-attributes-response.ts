import type { CollectionAttributeResponse } from '@echo/nft-scan/types/response/collection-attribute-response'

export interface CollectionAttributesResponse {
  attributes_name: string
  attributes_values: CollectionAttributeResponse[]
  total: number
}
