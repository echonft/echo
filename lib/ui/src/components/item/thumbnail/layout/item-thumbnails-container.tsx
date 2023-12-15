import type { Item } from '@echo/model/types/item'
import { ItemThumbnail } from '@echo/ui/components/item/thumbnail/item-thumbnail'
import { ItemThumbnailsContainerLayout } from '@echo/ui/components/item/thumbnail/layout/item-thumbnails-container-layout'
import { type FunctionComponent } from 'react'

interface Props {
  items: Item[]
  centered?: boolean
  onRemove?: (item: Item) => unknown
}

export const ItemThumbnailsContainer: FunctionComponent<Props> = ({ items, centered, onRemove }) => {
  return (
    <ItemThumbnailsContainerLayout centered={centered}>
      {items.map((item) => (
        <ItemThumbnail key={item.nft.id} item={item} onRemove={onRemove} />
      ))}
    </ItemThumbnailsContainerLayout>
  )
}
