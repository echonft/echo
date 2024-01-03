import type { OfferItem } from '@echo/model/types/offer-item'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  item: OfferItem
}

export const ItemCardTitleCollectionName: FunctionComponent<Props> = ({ item }) => {
  return (
    <p
      className={clsx(
        'font-inter',
        'text-[0.875rem]',
        'font-medium',
        'leading-[0.9375rem]',
        'tracking-[0.0175rem]',
        'text-white',
        'truncate'
      )}
    >
      {item.nft.collection.name}
    </p>
  )
}
