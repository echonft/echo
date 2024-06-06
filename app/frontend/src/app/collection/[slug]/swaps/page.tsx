import { getCompletedOffersForCollection } from '@echo/firestore/crud/offer/get-completed-offers-for-collection'
import { withFirebase } from '@echo/frontend/lib/decorators/with-firebase'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { Swap } from '@echo/model/types/swap'
import type { WithSlug } from '@echo/model/types/with-slug'
import { NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { CollectionNavigationLayout } from '@echo/ui/pages/collection/navigation/collection-navigation-layout'
import { CollectionSwaps } from '@echo/ui/pages/collection/swaps/collection-swaps'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextParams<WithSlug>

async function render({ params: { slug } }: Params) {
  const swaps = (await getCompletedOffersForCollection(slug)) as Swap[]
  return (
    <CollectionNavigationLayout slug={slug} activeNavigationItem={NAVIGATION_SWAPS}>
      <CollectionSwaps swaps={swaps} />
    </CollectionNavigationLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withFirebase)(render)
