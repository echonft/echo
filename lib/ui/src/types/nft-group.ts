import type { SelectableNft } from '@echo/ui/types/selectable-nft'

export interface NftGroup {
  id: string
  name?: string
  items: SelectableNft[]
}
