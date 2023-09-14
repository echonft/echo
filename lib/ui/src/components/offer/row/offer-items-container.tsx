import { ItemThumbnail } from '@echo/ui/components/item/thumbnail/item-thumbnail'
import { SizeLG } from '@echo/ui/constants/size'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

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
