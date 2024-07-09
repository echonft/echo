import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { getCollectionsWithSwapsCount } from '@echo/frontend/lib/helpers/collection/get-collections-with-swaps-count'
import type { WithUserProps } from '@echo/frontend/lib/types/with-user-props'
import type { Collection } from '@echo/model/types/collection'
import { CollectionsPage } from '@echo/ui/pages/collections/collections-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { addIndex, always, andThen, assoc, map, otherwise, pipe } from 'ramda'

async function render(_props: WithUserProps) {
  const collections = await pipe<
    [],
    Promise<Collection[]>,
    Promise<CollectionWithRank[]>,
    Promise<CollectionWithRank[]>
  >(
    getCollectionsWithSwapsCount,
    andThen<Collection[], CollectionWithRank[]>(
      addIndex(map)((collection, index) => assoc('rank', index + 1, collection))
    ),
    otherwise(pipe(captureAndLogError, always([])))
  )()
  return <CollectionsPage collections={collections} />
}

export default withUser(render)
