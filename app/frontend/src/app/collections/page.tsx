import { getRankedCollections } from '@echo/firestore/crud/collection/get-ranked-collections'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { otherwiseEmptyArray } from '@echo/frontend/lib/helpers/otherwise-empty-array'
import { CollectionsPage } from '@echo/ui/pages/collections/collections-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { pipe } from 'ramda'

async function render() {
  const collections = await pipe<[], Promise<CollectionWithRank[]>, Promise<CollectionWithRank[]>>(
    getRankedCollections,
    otherwiseEmptyArray
  )()
  return <CollectionsPage collections={collections} />
}

export default withUser(render)
