import type { OfferItem } from '@echo/model/types/offer-item'
import { ItemCardLayout } from '@echo/ui/components/item/card/layout/item-card-layout'
import { RemovableItemCardPicture } from '@echo/ui/components/item/removable-card/removable-item-card-picture'
import { RemovableItemCardTitle } from '@echo/ui/components/item/removable-card/removable-item-card-title'
import { type FunctionComponent } from 'react'

interface Props {
  item: OfferItem
  onRemove?: (item: OfferItem) => unknown
}

export const RemovableItemCard: FunctionComponent<Props> = ({ item, onRemove }) => {
  return (
    <ItemCardLayout>
      <RemovableItemCardPicture item={item} onRemove={onRemove} />
      <RemovableItemCardTitle item={item} />
    </ItemCardLayout>
  )
}
