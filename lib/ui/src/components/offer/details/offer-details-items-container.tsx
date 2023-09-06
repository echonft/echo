import { ItemThumbnail } from '../../item/item-thumbnail'
import { NewItemsTitle } from '../../item/new-items-title'
import { OfferItem, SizeLG } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  isReceiver: boolean
  items: OfferItem[]
}

export const OfferDetailsItemsContainer: FunctionComponent<Props> = ({ isReceiver, items }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <NewItemsTitle isReceiver={isReceiver} />
      <div className={clsx('flex', 'flex-row', 'gap-4', 'justify-center')}>
        {items.map((item) => (
          <ItemThumbnail item={item} key={item.nft.id} size={SizeLG} />
        ))}
      </div>
    </div>
  )
}
