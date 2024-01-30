import { getPendingOffersForReceiver } from '@echo/firestore/crud/offer/get-pending-offers-for-receiver'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { setOfferRoleReceiver } from '@echo/frontend/lib/helpers/offer/set-offer-role-receiver'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import { NAVIGATION_PENDING_OFFERS } from '@echo/ui/constants/navigation-item'
import { ProfileNavigationLayout } from '@echo/ui/pages/profile/navigation/profile-navigation-layout'
import { ProfileOffersReceived } from '@echo/ui/pages/profile/offers/profile-offers-received'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { andThen, map, path, pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render(params: NextAuthUserParams) {
  const offers = await pipe(
    nonNullableReturn(path(['user', 'username'])),
    getPendingOffersForReceiver,
    andThen(map(setOfferRoleReceiver))
  )(params)
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_PENDING_OFFERS}>
      <ProfileOffersReceived offers={offers} />
    </ProfileNavigationLayout>
  )
}

export default pipe(withLocale<NextAuthUserParams, Promise<ReactElement>>, withUser)(render)
