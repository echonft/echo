import type { NftTokenType } from '@echo/model/types/token'
import type { CollectionAttributesResponse } from '@echo/nft-scan/types/response/collection-attributes-response'
import type { Nullable } from '@echo/utils/types/nullable'

export interface CollectionResponse {
  amounts_total: number
  attributes?: Nullable<CollectionAttributesResponse[]>
  banner_url: string | null
  collections_with_same_name: string[]
  contract_address: string
  deploy_block_number: number
  description: string | null
  discord: string | null
  email: string | null
  erc_type: NftTokenType
  featured_url: string | null
  floor_price: number | null
  github: string | null
  instagram: string | null
  is_spam: boolean
  items_total: number
  large_image_url: string | null
  logo_url: string | null
  medium: string | null
  name: string
  opensea_floor_price: number | null
  opensea_slug: string | null
  opensea_verified: boolean
  owner: string
  owners_total: number
  price_symbol: string
  royalty: number | null
  symbol: string
  telegram: string | null
  twitter: string | null
  verified: boolean
  website: string | null
}
