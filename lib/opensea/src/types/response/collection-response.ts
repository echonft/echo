import type { CollectionContractResponse } from '@echo/opensea/types/response/collection-contract-response'
import type { Nullable } from '@echo/utils/types/nullable'

export interface CollectionResponse {
  banner_image_url: Nullable<string>
  category: string
  collection: string
  collection_offers_enabled: boolean
  contracts: CollectionContractResponse[]
  created_date: string
  description: Nullable<string>
  discord_url: Nullable<string>
  image_url: Nullable<string>
  instagram_username: Nullable<string>
  is_disabled: boolean
  is_nsfw: boolean
  name: string
  opensea_url: string
  owner: string
  project_url: Nullable<string>
  safelist_status: 'not_requested' | 'requested' | 'approved' | 'verified' | 'disabled_top_trending'
  telegram_url: Nullable<string>
  total_supply: number
  trait_offers_enabled: boolean
  twitter_username: Nullable<string>
  wiki_url: Nullable<string>
}
