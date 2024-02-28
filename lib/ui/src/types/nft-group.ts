import type { WithId } from '@echo/model/types/with-id'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'

export interface NftGroup extends WithId {
  label?: string
  nfts: SelectableNft[]
}
