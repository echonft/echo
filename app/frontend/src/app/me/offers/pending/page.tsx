import { getPendingOffersForReceiver } from '@echo/firestore/crud/offer/get-pending-offers-for-receiver'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { setOfferRoleReceiver } from '@echo/frontend/lib/helpers/offer/set-offer-role-receiver'
import type { WithAuthUserProps } from '@echo/frontend/lib/types/with-auth-user-props'
import { NAVIGATION_PENDING_OFFERS } from '@echo/ui/constants/navigation-item'
import { ProfileNavigationLayout } from '@echo/ui/pages/profile/navigation/profile-navigation-layout'
import { ProfilePendingOffers } from '@echo/ui/pages/profile/offers/pending/profile-pending-offers'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { andThen, map, path, pipe } from 'ramda'

async function render(params: WithAuthUserProps) {
  const offers = await pipe(
    nonNullableReturn(path(['user', 'username'])),
    getPendingOffersForReceiver,
    andThen(map(setOfferRoleReceiver))
  )(params)
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_PENDING_OFFERS}>
      <ProfilePendingOffers offers={offers} />
    </ProfileNavigationLayout>
  )
}

export default withLoggedInUser(render)
