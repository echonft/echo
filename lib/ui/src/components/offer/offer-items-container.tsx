import { OfferItemThumbnail } from '../offer-item/offer-item-thumbnail'
import { OfferItem, SizeLG } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OfferAssetsContainerProps {
  items: OfferItem[]
  discordUsername?: string
}

export const OfferItemsContainer: FunctionComponent<OfferAssetsContainerProps> = ({ items, discordUsername }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-4')}>
      {items.map((item) => (
        <OfferItemThumbnail item={item} key={item.nft.id} size={SizeLG} discordUsername={discordUsername} />
      ))}
    </div>
  )
}
