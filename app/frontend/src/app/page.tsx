import { getCollectionsWithSwapsCount } from '@echo/firestore/crud/collection-with-counts/get-collections-with-swaps-count'
import { getSwaps } from '@echo/firestore/crud/swap/get-swaps'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { WithUserProps } from '@echo/frontend/lib/types/with-user-props'
import type { Collection } from '@echo/model/types/collection/collection'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { Background } from '@echo/ui/constants/background'
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
  const swaps = await getSwaps(5)
  return (
    <PageLayout user={user} background={Background.Home}>
      <HomePage collections={collections} swaps={swaps} />
    </PageLayout>
  )
}

export default withUser(render)
