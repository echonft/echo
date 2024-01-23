import { linkProvider } from '@echo/api/services/routing/link-provider'
import { OFFER_FILTER_AS_SENDER } from '@echo/firestore/constants/offer/offer-filter-as'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/auth/redirect-if-not-logged-in'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import type { Offer } from '@echo/model/types/offer'
import { ProfileOffersCreatedApiProvided } from '@echo/ui/components/profile/api-provided/profile-offers-created-api-provided'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { andThen, assoc, map, pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render({ user }: NextUserParams) {
  redirectIfNotLoggedIn(user, linkProvider.profile.offersCreated.getUrl())
  const offers = await pipe<
    [string, OfferQueryFilters, QueryConstraints<Offer>],
    Promise<Offer[]>,
    Promise<OfferWithRole[]>
  >(getOffersForUser, andThen(map<Offer, OfferWithRole>(assoc('role', OFFER_ROLE_SENDER))))(
    user.username,
    {
      as: OFFER_FILTER_AS_SENDER
    },
    {
      orderBy: [{ field: 'createdAt', direction: 'desc' }]
    }
  )
  return <ProfileOffersCreatedApiProvided offers={offers} />
}

export default pipe(withLocale<NextUserParams, Promise<ReactElement>>, withUser)(render)
