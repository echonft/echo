import type { OfferItem } from '@echo/model/types/offer-item'
import { getTokenIdString } from '@echo/ui/helpers/nft/get-token-id-string'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  item: OfferItem
}

export const ItemCardTitleTokenId: FunctionComponent<Props> = ({ item }) => {
  return (
    <p
      className={clsx(
        'font-inter',
        'text-[0.875rem]',
        'font-normal',
        'leading-[0.9375rem]',
        'tracking-[0.0175rem]',
        'text-white/70',
        'truncate'
      )}
    >
      {getTokenIdString(item.nft.tokenId, item.nft.collection.totalSupply)}
    </p>
  )
}
