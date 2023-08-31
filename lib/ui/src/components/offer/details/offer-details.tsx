import { OfferDetailsSkeleton } from '../../skeleton/offer/offer-details-skeleton'
import { OfferDetailsFetcher } from '../fetchers/offer-details-fetcher'
import { Offer, User } from '@echo/ui-model'
import { FunctionComponent, Suspense } from 'react'

export interface OfferDetailsProps {
  user: User
  initialOffer?: Offer
  offerId?: string
  onOfferError?: (error: Error) => unknown
}

export const OfferDetails: FunctionComponent<OfferDetailsProps> = ({ user, initialOffer, offerId, onOfferError }) => {
  return (
    <Suspense fallback={<OfferDetailsSkeleton />}>
      <OfferDetailsFetcher offerId={offerId} initialOffer={initialOffer} user={user} onOfferError={onOfferError} />
    </Suspense>
  )
}
