import { type OfferItem } from '@echo/model/types/offer-item'
import { HideIfNilOrEmpty } from '@echo/ui/components/base/utils/hide-if-nil-or-empty'
import { ItemsLayout } from '@echo/ui/components/item/layout/items-layout'
import { RemovableItemCard } from '@echo/ui/components/item/removable-card/removable-item-card'
import { ItemsSeparator } from '@echo/ui/components/shared/items-separator'
import { clsx } from 'clsx'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  receiverItems: OfferItem[]
  onRemoveReceiverItem?: (item: OfferItem) => unknown
  senderItems?: OfferItem[]
  onRemoveSenderItem?: (item: OfferItem) => unknown
}

export const NewOfferModalItemsContainer: FunctionComponent<Props> = ({
  receiverItems,
  onRemoveReceiverItem,
  senderItems,
  onRemoveSenderItem
}) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-4.5', 'items-center', 'min-w-[40rem]')}>
      <ItemsLayout>
        {map(
          (item) => (
            <RemovableItemCard item={item} key={item.nft.id} onRemove={onRemoveReceiverItem} />
          ),
          receiverItems
        )}
      </ItemsLayout>
      <HideIfNilOrEmpty checks={senderItems} render={() => <ItemsSeparator />} />
      <HideIfNilOrEmpty
        checks={senderItems}
        render={(items) => (
          <ItemsLayout>
            {map(
              (item) => (
                <RemovableItemCard item={item} key={item.nft.id} onRemove={onRemoveSenderItem} />
              ),
              items
            )}
          </ItemsLayout>
        )}
      />
    </div>
  )
}
