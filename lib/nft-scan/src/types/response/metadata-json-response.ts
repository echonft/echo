import type { Nullable } from '@echo/utils/types/nullable'

interface AttributeResponse {
  trait_type: string
  value: string
}

export interface MetadataJsonResponse {
  name: string
  description: string
  external_url: string
  image: string
  attributes: Nullable<AttributeResponse[]>
}
