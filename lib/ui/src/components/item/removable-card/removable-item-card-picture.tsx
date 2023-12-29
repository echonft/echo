import type { OfferItem } from '@echo/model/types/offer-item'
import { Img } from '@echo/ui/components/base/img'
import { ItemCardPictureLayout } from '@echo/ui/components/item/card/layout/item-card-picture-layout'
import { RemovableItemCardSelector } from '@echo/ui/components/item/removable-card/removable-item-card-selector'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  item: OfferItem
  onRemove?: (item: OfferItem) => unknown
}

export const RemovableItemCardPicture: FunctionComponent<Props> = ({ item, onRemove }) => {
  return (
    <ItemCardPictureLayout>
      <Img
        className={clsx(
          'select-none',
          'transition-transform',
          'w-full',
          'h-full',
          'object-center',
          'object-contain',
          'group-hover:scale-125'
        )}
        src={item.nft.pictureUrl}
        alt={item.nft.tokenId.toString()}
        width={200}
        height={200}
      />
      <RemovableItemCardSelector item={item} onRemove={onRemove} />
    </ItemCardPictureLayout>
  )
}
