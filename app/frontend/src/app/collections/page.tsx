import { withFirebase } from '@echo/frontend/lib/decorators/with-firebase'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { getCollectionsWithSwapsCount } from '@echo/frontend/lib/helpers/collection/get-collections-with-swaps-count'
import type { Collection } from '@echo/model/types/collection'
import { CollectionsPage } from '@echo/ui/pages/collections/collections-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { addIndex, andThen, assoc, map, pipe } from 'ramda'

async function render() {
  const collections = await pipe<[], Promise<Collection[]>, Promise<CollectionWithRank[]>>(
    getCollectionsWithSwapsCount,
    andThen<Collection[], CollectionWithRank[]>(
      addIndex(map)((collection, index) => assoc('rank', index + 1, collection))
    )
  )()
  return <CollectionsPage collections={collections} />
}

export default pipe(withLocale, withFirebase)(render)
