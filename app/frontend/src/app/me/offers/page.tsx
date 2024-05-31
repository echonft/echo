import { getOffersForSender } from '@echo/firestore/crud/offer/get-offers-for-sender'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { setOfferRoleSender } from '@echo/frontend/lib/helpers/offer/set-offer-role-sender'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import { NAVIGATION_OFFERS } from '@echo/ui/constants/navigation-item'
import { ProfileNavigationLayout } from '@echo/ui/pages/profile/navigation/profile-navigation-layout'
import { ProfileOffers } from '@echo/ui/pages/profile/offers/profile-offers'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { andThen, map, path, pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render(params: NextAuthUserParams) {
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

export default pipe(withLocale<NextAuthUserParams, Promise<ReactElement>>, withLoggedInUser)(render)
