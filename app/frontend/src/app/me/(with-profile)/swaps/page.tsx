import { linkProvider } from '@echo/api/services/routing/link-provider'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { getAuthUser } from '@echo/frontend/lib/auth/get-auth-user'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/auth/redirect-if-not-logged-in'
import { withFirebase } from '@echo/frontend/lib/hoc/with-firebase'
import { OFFER_ROLE_RECEIVER, OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import { ProfileSwapsApiProvided } from '@echo/ui/components/profile/api-provided/profile-swaps-api-provided'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { unstable_setRequestLocale } from 'next-intl/server'
import { andThen, assoc, ifElse, map, pathEq, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

const ProfileSwapsPage: FunctionComponent = async () => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  redirectIfNotLoggedIn(user, linkProvider.profile.swaps.getUrl())
  const offers = await pipe<
    [string, OfferQueryFilters, QueryConstraints<Offer>],
    Promise<Offer[]>,
    Promise<OfferWithRole[]>
  >(
    getOffersForUser,
    andThen(
      map<Offer, OfferWithRole>(
        ifElse<[Offer], OfferWithRole, OfferWithRole>(
          pathEq(user.username, ['sender', 'username']),
          assoc('role', OFFER_ROLE_RECEIVER),
          assoc('role', OFFER_ROLE_SENDER)
        )
      )
    )
  )(
    user.username,
    { state: [OFFER_STATE_COMPLETED] },
    {
      orderBy: [{ field: 'expiresAt', direction: 'desc' }]
    }
  )
  return <ProfileSwapsApiProvided offers={offers} />
}

export default withFirebase(ProfileSwapsPage)
