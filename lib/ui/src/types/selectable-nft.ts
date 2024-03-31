import type { Nft } from '@echo/model/types/nft'
import type { NftAction } from '@echo/ui/types/nft-action'

export interface SelectableNft extends Nft {
  action?: NftAction
  actionDisabled?: boolean
}
