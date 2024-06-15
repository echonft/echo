import { getCompletedOffersForCollection } from '@echo/firestore/crud/offer/get-completed-offers-for-collection'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import type { Swap } from '@echo/model/types/swap'
import type { WithSlug } from '@echo/model/types/with-slug'
import { NAVIGATION_SWAPS } from '@echo/ui/constants/navigation-item'
import { CollectionNavigationLayout } from '@echo/ui/pages/collection/navigation/collection-navigation-layout'
import { CollectionSwaps } from '@echo/ui/pages/collection/swaps/collection-swaps'
import type { WithLoggerType } from '@echo/utils/types/with-logger'

async function render({ params: { slug } }: PropsWithUser<NextParams<WithLoggerType<WithSlug>>>) {
  const swaps = (await getCompletedOffersForCollection(slug)) as Swap[]
  return (
    <CollectionNavigationLayout slug={slug} activeNavigationItem={NAVIGATION_SWAPS}>
      <CollectionSwaps swaps={swaps} />
    </CollectionNavigationLayout>
  )
}

export default withUser(render)
