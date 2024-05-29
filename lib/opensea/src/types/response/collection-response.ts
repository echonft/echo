import type { CollectionContractResponse } from '@echo/opensea/types/response/collection-contract-response'
import type { Nullable } from '@echo/utils/types/nullable'

export interface CollectionResponse {
  collection: string
  name: string
  description: Nullable<string>
  image_url: Nullable<string>
  banner_image_url: Nullable<string>
  owner: string
  safelist_status: 'not_requested' | 'requested' | 'approved' | 'verified' | 'disabled_top_trending'
  category: string
  is_disabled: boolean
  is_nsfw: boolean
  trait_offers_enabled: boolean
  collection_offers_enabled: boolean
  opensea_url: string
  project_url: Nullable<string>
  wiki_url: Nullable<string>
  discord_url: Nullable<string>
  telegram_url: Nullable<string>
  twitter_username: Nullable<string>
  instagram_username: Nullable<string>
  contracts: CollectionContractResponse[]
  total_supply: number
  created_date: string
}
