import { User } from '../../types/user'
import { OffersSkeleton } from '../skeleton/offer/offers-skeleton'
import { OffersFetcher } from './fetchers/offers-fetcher'
import { FunctionComponent, Suspense } from 'react'

interface Props {
  user: User
  onOffersError?: (error: Error) => unknown
}

export const Offers: FunctionComponent<Props> = ({ user, onOffersError }) => {
  return (
    <Suspense fallback={<OffersSkeleton />}>
      <OffersFetcher user={user} onOffersError={onOffersError} />
    </Suspense>
  )
}
