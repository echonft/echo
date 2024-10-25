import type { NftAttribute } from '@echo/model/types/nft-attribute'
import type { Filter } from '@echo/ui/types/filter'

export interface TraitFilter extends Filter {
  attribute: NftAttribute
}
