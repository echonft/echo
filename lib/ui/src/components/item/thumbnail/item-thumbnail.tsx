import type { Item } from '@echo/model/types/item'
import { NftThumbnail } from '@echo/ui/components/nft/thumbnail/nft-thumbnail'
import { type FunctionComponent } from 'react'

interface Props {
  item: Item
  removable?: boolean
  onRemove?: (item: Item) => unknown
}

export const ItemThumbnail: FunctionComponent<Props> = ({ item, removable, onRemove }) => {
  return (
    <NftThumbnail
      nft={item.nft}
      removable={removable}
      onRemove={() => {
        onRemove?.(item)
      }}
    />
  )
}
