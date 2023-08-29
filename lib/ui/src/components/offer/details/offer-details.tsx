import { OfferDetailsSkeleton } from '../../skeleton/offer/offer-details-skeleton'
import { OfferDetailsFetcher } from '../fetchers/offer-details-fetcher'
import { Offer, User } from '@echo/ui-model'
import { FunctionComponent, Suspense } from 'react'

export interface OfferDetailsProps {
  user: User
  offer?: Offer
  offerId?: string
  onOfferError?: (error: Error) => unknown
  // For testing purposes only
  renderModal?: boolean
}

export const OfferDetails: FunctionComponent<OfferDetailsProps> = ({
  user,
  offer,
  offerId,
  onOfferError,
  renderModal = true
}) => {
  return (
    <Suspense fallback={<OfferDetailsSkeleton />}>
      <OfferDetailsFetcher
        offerId={offerId}
        offer={offer}
        user={user}
        onOfferError={onOfferError}
        renderModal={renderModal}
      />
    </Suspense>
  )
}
