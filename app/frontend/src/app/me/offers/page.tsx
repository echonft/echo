import { getOffersForSender } from '@echo/firestore/crud/offer/get-offers-for-sender'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { setOfferRoleSender } from '@echo/frontend/lib/helpers/offer/set-offer-role-sender'
import type { WithAuthUserProps } from '@echo/frontend/lib/types/with-auth-user-props'
import { NAVIGATION_OFFERS } from '@echo/ui/constants/navigation-item'
import { ProfileNavigationLayout } from '@echo/ui/pages/profile/navigation/profile-navigation-layout'
import { ProfileOffers } from '@echo/ui/pages/profile/offers/profile-offers'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { andThen, map, path, pipe } from 'ramda'

// TODO split between these and swaps
async function render(params: WithAuthUserProps) {
  const offers = await pipe(
    nonNullableReturn(path(['user', 'username'])),
    getOffersForSender,
    andThen(map(setOfferRoleSender))
  )(params)
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_OFFERS}>
      <ProfileOffers offers={offers} />
    </ProfileNavigationLayout>
  )
}

export default withLoggedInUser(render)
