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
  senderItems?: OfferItem[]
}

export const NewOfferModalItemsContainer: FunctionComponent<Props> = ({ receiverItems, senderItems }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-4.5', 'items-center')}>
      <ItemsLayout>
        {map(
          (item) => (
            <RemovableItemCard item={item} />
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
                <RemovableItemCard item={item} />
              ),
              items
            )}
          </ItemsLayout>
        )}
      />
    </div>
  )
}
