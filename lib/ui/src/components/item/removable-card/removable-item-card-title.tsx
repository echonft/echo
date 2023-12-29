import type { OfferItem } from '@echo/model/types/offer-item'
import { ItemCardTitleCollectionName } from '@echo/ui/components/item/card/item-card-title-collection-name'
import { ItemCardTitleTokenId } from '@echo/ui/components/item/card/item-card-title-token-id'
import { RemovableItemCardTitleLayout } from '@echo/ui/components/item/removable-card/layout/removable-item-card-title-layout'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  item: OfferItem
}

export const RemovableItemCardTitle: FunctionComponent<Props> = ({ item }) => {
  return (
    <RemovableItemCardTitleLayout>
      <div className={clsx('translate-y-0', 'transition-transform ease-in-out', 'group-hover:-translate-y-2')}>
        <ItemCardTitleCollectionName item={item} />
        <ItemCardTitleTokenId item={item} />
      </div>
    </RemovableItemCardTitleLayout>
  )
}
