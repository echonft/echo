import { linkProvider } from '@echo/api/services/routing/link-provider'
import { OFFER_FILTER_AS_RECEIVER } from '@echo/firestore/constants/offer/offer-filter-as'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { getAuthUser } from '@echo/frontend/lib/auth/get-auth-user'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/auth/redirect-if-not-logged-in'
import { withFirebase } from '@echo/frontend/lib/hoc/with-firebase'
import { OFFER_ROLE_RECEIVER } from '@echo/model/constants/offer-role'
import { READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import { ProfileOffersReceivedApiProvided } from '@echo/ui/components/profile/api-provided/profile-offers-received-api-provided'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { unstable_setRequestLocale } from 'next-intl/server'
import { andThen, assoc, map, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

const ProfileOffersReceivedPage: FunctionComponent = async () => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  redirectIfNotLoggedIn(user, linkProvider.profile.offersReceived.getUrl())
  const offers = await pipe<
    [string, OfferQueryFilters, QueryConstraints<Offer>],
    Promise<Offer[]>,
    Promise<OfferWithRole[]>
  >(getOffersForUser, andThen(map<Offer, OfferWithRole>(assoc('role', OFFER_ROLE_RECEIVER))))(
    user.username,
    {
      as: OFFER_FILTER_AS_RECEIVER,
      notState: READ_ONLY_OFFER_STATES
    },
    {
      orderBy: [{ field: 'expiresAt', direction: 'desc' }]
    }
  )
  return <ProfileOffersReceivedApiProvided offers={offers} />
}

export default withFirebase(ProfileOffersReceivedPage)
