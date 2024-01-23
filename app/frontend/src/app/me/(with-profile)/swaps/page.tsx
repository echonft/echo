import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import { OFFER_ROLE_RECEIVER, OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import { ProfileSwapsApiProvided } from '@echo/ui/components/profile/api-provided/profile-swaps-api-provided'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { andThen, assoc, ifElse, map, pathEq, pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render({ user }: NextAuthUserParams) {
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

export default pipe(withLocale<NextAuthUserParams, Promise<ReactElement>>, withUser)(render)
