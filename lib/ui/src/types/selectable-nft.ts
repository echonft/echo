import type { Nft } from '@echo/model/types/nft'
import { type Disableable } from '@echo/ui/types/disableable'
import type { NftAction } from '@echo/ui/types/nft-action'
import { type Selectable } from '@echo/ui/types/selectable'
import type { WithVisiblity } from '@echo/ui/types/with-visiblity'

export interface SelectableNft extends Nft, Disableable, Selectable, WithVisiblity {
  action?: NftAction
  actionDisabled?: boolean
}
