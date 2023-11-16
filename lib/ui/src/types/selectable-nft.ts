import type { Nft } from '@echo/model/types/nft'
import { type Disableable } from '@echo/ui/types/disableable'
import type { NftAction } from '@echo/ui/types/nft-action'
import { type Selectable } from '@echo/ui/types/selectable'

export interface SelectableNft extends Nft, Disableable, Selectable {
  action?: NftAction
  actionDisabled?: boolean
}
