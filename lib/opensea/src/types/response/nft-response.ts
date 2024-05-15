import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'

export interface NftResponse {
  identifier: string
  collection: string
  contract: HexString
  token_standard: 'erc721' | 'erc1155'
  name: string
  description: string
  image_url: Nullable<string>
  metadata_url: Nullable<string>
  opensea_url: Nullable<string>
  updated_at: string
  is_disabled: boolean
  is_nsfw: boolean
}
