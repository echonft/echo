import { collectionContractSchema } from '@echo/opensea/validators/collection-response-schema'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'

export type CollectionContract = ReturnType<typeof collectionContractSchema.parse>

export interface CollectionResponse {
  banner_image_url: Nullable<string>
  category: string
  collection: string
  collection_offers_enabled: boolean
  contracts: { address: HexString; contract: ChainName }[]
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
