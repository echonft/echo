import { ItemThumbnail } from '@echo/ui/components/item/thumbnail/item-thumbnail'
import { OfferItemsContainerLayout } from '@echo/ui/components/offer/layout/offer-items-container-layout'
import { SizeLG } from '@echo/ui/constants/size'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import type { FunctionComponent } from 'react'

interface Props {
  items: OfferItem[]
  discordUsername?: string
}

export const OfferItemsContainer: FunctionComponent<Props> = ({ items, discordUsername }) => {
  return (
    <OfferItemsContainerLayout>
      {items.map((item) => (
        <ItemThumbnail item={item} key={item.nft.id} size={SizeLG} discordUsername={discordUsername} />
      ))}
    </OfferItemsContainerLayout>
  )
}
