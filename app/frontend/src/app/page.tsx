import { getCompletedOffers } from '@echo/firestore/crud/offer/get-completed-offers'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { getCollectionsWithSwapsCount } from '@echo/frontend/lib/helpers/collection/get-collections-with-swaps-count'
import type { WithUserProps } from '@echo/frontend/lib/types/with-user-props'
import type { Collection } from '@echo/model/types/collection'
import type { Swap } from '@echo/model/types/swap'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { BG_HOME } from '@echo/ui/constants/background'
import { HomePage } from '@echo/ui/pages/home/home-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { addIndex, andThen, assoc, map, pipe } from 'ramda'

async function render({ user }: WithUserProps) {
  const collections = await pipe<[number], Promise<Collection[]>, Promise<CollectionWithRank[]>>(
    getCollectionsWithSwapsCount,
    andThen<Collection[], CollectionWithRank[]>(
      addIndex(map)((collection, index) => assoc('rank', index + 1, collection))
    )
  )(10)
  const swaps = (await getCompletedOffers(5)) as Swap[]
  return (
    <PageLayout user={user} background={BG_HOME}>
      <HomePage collections={collections} swaps={swaps} />
    </PageLayout>
  )
}

export default withUser(render)
