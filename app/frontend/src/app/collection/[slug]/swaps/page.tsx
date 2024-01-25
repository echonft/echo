import { getCompletedOffersForCollection } from '@echo/firestore/crud/offer/get-completed-offers-for-collection'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import type { Offer } from '@echo/model/types/offer'
import { NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { setOfferRoleForUser } from '@echo/ui/helpers/offer/set-offer-role-for-user'
import { CollectionNavigationLayout } from '@echo/ui/pages/collection/navigation/collection-navigation-layout'
import { CollectionSwaps } from '@echo/ui/pages/collection/swaps/collection-swaps'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { andThen, map, pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<Record<'slug', string>>>

async function render({ params: { slug }, user }: Params) {
  const offers = await pipe(
    getCompletedOffersForCollection,
    andThen(map<Offer, OfferWithRole>(setOfferRoleForUser(user)))
  )(slug)
  return (
    <CollectionNavigationLayout slug={slug} activeNavigationItem={NAVIGATION_SWAPS}>
      <CollectionSwaps offers={offers} />
    </CollectionNavigationLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
