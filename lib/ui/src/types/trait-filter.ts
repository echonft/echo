import type { NftAttribute } from '@echo/model/types/nft-attribute'
import type { NftFilter } from '@echo/ui/types/nft-filter'

export interface TraitFilter extends NftFilter {
  attribute: NftAttribute
}
