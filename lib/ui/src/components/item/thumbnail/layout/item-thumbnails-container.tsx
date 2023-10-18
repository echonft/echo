import { type OfferItem } from '@echo/model/types/offer-item'
import { ItemThumbnail } from '@echo/ui/components/item/thumbnail/item-thumbnail'
import { ItemThumbnailsContainerLayout } from '@echo/ui/components/item/thumbnail/layout/item-thumbnails-container-layout'
import { type FunctionComponent } from 'react'

interface Props {
  items: OfferItem[]
  centered?: boolean
  onRemove?: (itemNftId: string) => unknown
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
