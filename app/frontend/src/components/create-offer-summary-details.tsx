import { OfferItemNftsFetcher } from '@components/offer-item-nfts-fetcher'
import { OfferItem, OfferType } from '@echo/model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  type: OfferType
  ownerItems: OfferItem[]
  counterpartyItems: OfferItem[]
}

export const CreateOfferSummaryDetails: FunctionComponent<Props> = ({ type, ownerItems, counterpartyItems }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-2')}>
      <OfferItemNftsFetcher items={ownerItems} type={type} owner />
      <OfferItemNftsFetcher items={counterpartyItems} type={type} />
    </div>
  )
}
