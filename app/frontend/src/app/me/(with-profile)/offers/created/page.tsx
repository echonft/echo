import { linkProvider } from '@echo/api/services/routing/link-provider'
import { OFFER_FILTER_AS_SENDER } from '@echo/firestore/constants/offer/offer-filter-as'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { redirectIfNotLoggedIn } from '@echo/frontend/lib/auth/redirect-if-not-logged-in'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import type { Offer } from '@echo/model/types/offer'
import { ProfileOffersCreatedApiProvided } from '@echo/ui/components/profile/api-provided/profile-offers-created-api-provided'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { andThen, assoc, map, pipe } from 'ramda'

async function render() {
  const user = await initializeServerComponent({ getAuthUser: true })
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

export default withLocale(render)
