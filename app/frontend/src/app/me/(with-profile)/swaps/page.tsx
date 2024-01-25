import { getCompletedOffersForUser } from '@echo/firestore/crud/offer/get-completed-offers-for-user'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import type { Offer } from '@echo/model/types/offer'
import { NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { setOfferRoleForUser } from '@echo/ui/helpers/offer/set-offer-role-for-user'
import { ProfileNavigationLayout } from '@echo/ui/pages/profile/navigation/profile-navigation-layout'
import { ProfileSwaps } from '@echo/ui/pages/profile/swaps/profile-swaps'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { andThen, map, path, pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render(params: NextAuthUserParams) {
  const offers = await pipe(
    nonNullableReturn(path(['user', 'username'])),
    getCompletedOffersForUser,
    andThen(map<Offer, OfferWithRole>(setOfferRoleForUser(params.user)))
  )(params)
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_SWAPS}>
      <ProfileSwaps offers={offers} />
    </ProfileNavigationLayout>
  )
}

export default pipe(withLocale<NextAuthUserParams, Promise<ReactElement>>, withUser)(render)
