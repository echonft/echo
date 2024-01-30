import { linkProvider } from '@echo/api/routing/link-provider'
import { getCompletedOffersForUser } from '@echo/firestore/crud/offer/get-completed-offers-for-user'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { setOfferRoleForUser } from '@echo/frontend/lib/helpers/offer/set-offer-role-for-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import type { Offer } from '@echo/model/types/offer'
import { NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { UserNavigationLayout } from '@echo/ui/pages/user/navigation/user-navigation-layout'
import { UserSwaps } from '@echo/ui/pages/user/swaps/user-swaps'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { redirect } from 'next/navigation'
import { andThen, map, pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<Record<'username', string>>>
async function render({ params: { username }, user }: Params) {
  if (user?.username === username) {
    redirect(linkProvider.profile.swaps.get())
  }
  const offers = await pipe(
    getCompletedOffersForUser,
    andThen(map<Offer, OfferWithRole>(setOfferRoleForUser(user)))
  )(username)
  return (
    <UserNavigationLayout username={username} activeNavigationItem={NAVIGATION_SWAPS}>
      <UserSwaps username={username} offers={offers} />
    </UserNavigationLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
