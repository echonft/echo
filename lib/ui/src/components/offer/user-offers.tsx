import { User } from '../../types/user'
import { UserOffersSkeleton } from '../skeleton/offer/user-offers-skeleton'
import { UserOffersFetcher } from './fetchers/user-offers-fetcher'
import { FunctionComponent, Suspense } from 'react'

interface Props {
  user: User
  onOffersError?: (error: Error) => unknown
}

export const UserOffers: FunctionComponent<Props> = ({ user, onOffersError }) => {
  return (
    <Suspense fallback={<UserOffersSkeleton />}>
      <UserOffersFetcher user={user} onOffersError={onOffersError} />
    </Suspense>
  )
}
