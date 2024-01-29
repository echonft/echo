import { getCompletedOffers } from '@echo/firestore/crud/offer/get-completed-offers'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { getCollectionsWithSwapsCount } from '@echo/frontend/lib/helpers/collection/get-collections-with-swaps-count'
import { setOfferRoleForUser } from '@echo/frontend/lib/helpers/offer/set-offer-role-for-user'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { PAGE_LAYOUT_BG_HOME } from '@echo/ui/constants/page-layout-background'
import { HomePage } from '@echo/ui/pages/home/home-page'
import { andThen, map, pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render({ user }: NextUserParams) {
  const collections = await getCollectionsWithSwapsCount(10)
  const offers = await pipe(getCompletedOffers, andThen(map(setOfferRoleForUser(user))))(5)
  return (
    <PageLayout user={user} background={PAGE_LAYOUT_BG_HOME}>
      <HomePage collections={collections} offers={offers} />
    </PageLayout>
  )
}

export default pipe(withLocale<NextUserParams, Promise<ReactElement>>, withUser)(render)
