import { OfferItemNftsFetcher } from '@components/offer-item-nfts-fetcher'
import { OfferType } from '@echo/model/offer'
import { OfferItem } from '@echo/model/offer-item'
import { clsx } from 'clsx'
import React from 'react'

interface Props {
  type: OfferType
  ownerItems: OfferItem[]
  counterpartyItems: OfferItem[]
}

export const CreateOfferSummaryDetails: React.FunctionComponent<Props> = ({ type, ownerItems, counterpartyItems }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-2')}>
      <OfferItemNftsFetcher items={ownerItems} type={type} owner />
      <OfferItemNftsFetcher items={counterpartyItems} type={type} />
    </div>
  )
}
