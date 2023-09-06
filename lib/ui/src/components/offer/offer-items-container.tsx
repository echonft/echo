import { ItemThumbnail } from '../item/item-thumbnail'
import { OfferItem, SizeLG } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  items: OfferItem[]
  discordUsername?: string
}

export const OfferItemsContainer: FunctionComponent<Props> = ({ items, discordUsername }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-4')}>
      {items.map((item) => (
        <ItemThumbnail item={item} key={item.nft.id} size={SizeLG} discordUsername={discordUsername} />
      ))}
    </div>
  )
}
