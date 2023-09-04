import { OfferDetailsAssetsSeparator } from '../../offer/details/offer-details-assets-separator'
import { OfferDetailsButtonsContainerSkeleton } from './offer-details-buttons-container-skeleton'
import { OfferDetailsItemsContainerSkeleton } from './offer-details-items-container-skeleton'
import { OfferDetailsStateSkeleton } from './offer-details-state-skeleton'
import { OfferReceiverDetailsContainerSkeleton } from './offer-receiver-details-container-skeleton'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const OfferDetailsSkeleton: FunctionComponent = () => (
  <div className={clsx('flex', 'flex-col', 'gap-16', 'p-4', 'rounded-lg', 'bg-white/[0.05]')}>
    <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center')}>
      <OfferReceiverDetailsContainerSkeleton />
      <OfferDetailsStateSkeleton />
    </div>
    <div className={clsx('flex', 'flex-col', 'gap-5')}>
      <OfferDetailsItemsContainerSkeleton isReceiving />
      <div className={clsx('pb-4')}>
        <OfferDetailsAssetsSeparator />
      </div>
      <OfferDetailsItemsContainerSkeleton isReceiving={false} />
      <div className={clsx('flex', 'justify-center', 'items-center', 'pt-10', 'pb-5')}>
        <OfferDetailsButtonsContainerSkeleton />
      </div>
    </div>
  </div>
)
