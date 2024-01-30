import { getOffersForSender } from '@echo/firestore/crud/offer/get-offers-for-sender'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { setOfferRoleSender } from '@echo/frontend/lib/helpers/offer/set-offer-role-sender'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import { NAVIGATION_OFFERS_CREATED } from '@echo/ui/constants/navigation-item'
import { ProfileNavigationLayout } from '@echo/ui/pages/profile/navigation/profile-navigation-layout'
import { ProfileOffersCreated } from '@echo/ui/pages/profile/offers/profile-offers-created'
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
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_OFFERS_CREATED}>
      <ProfileOffersCreated offers={offers} />
    </ProfileNavigationLayout>
  )
}

export default pipe(withLocale<NextAuthUserParams, Promise<ReactElement>>, withUser)(render)
