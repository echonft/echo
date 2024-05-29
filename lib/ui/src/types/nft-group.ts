import type { Nft } from '@echo/model/types/nft'
import type { WithId } from '@echo/model/types/with-id'
import type { Selectable } from '@echo/ui/types/selectable'

export interface NftGroup extends WithId {
  label?: string
  nfts: Nft[]
}
