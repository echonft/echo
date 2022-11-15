import { OfferItemNftsFetcher } from '@components/offer-item-nfts-fetcher'
import { NewOffer } from '@echo/model/src/offer'
import clsx from 'clsx'
import React from 'react'

interface Props {
  offer: NewOffer
}

export const CreateOfferSummaryDetails: React.FunctionComponent<Props> = ({ offer }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-2')}>
      <OfferItemNftsFetcher items={offer.ownerItems} type={offer.type} owner />
      <OfferItemNftsFetcher items={offer.counterpartyItems} type={offer.type} />
    </div>
  )
}
