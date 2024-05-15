import type { NftResponse } from '@echo/opensea/types/response/nft-response'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'

type TraitDisplayType = 'number' | 'boost_percentage' | 'boost_number' | 'author' | 'date' | 'None'

export interface Trait {
  trait_type: string
  display_type: Nullable<TraitDisplayType>
  max_value: Nullable<string>
  value: string
}

interface Owner {
  address: HexString
  quantity: number
}

export interface NftExtendedResponse extends NftResponse {
  animation_url: Nullable<string>
  is_suspicious: boolean
  creator: string
  traits: Nullable<Trait[]>
  owners: Owner[]
}
