import { getRankedCollections } from '@echo/firestore/crud/collection/get-ranked-collections'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { CollectionsPage } from '@echo/ui/pages/collections/collections-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { always, otherwise, pipe } from 'ramda'

async function render() {
  const collections = await pipe<[], Promise<CollectionWithRank[]>, Promise<CollectionWithRank[]>>(
    getRankedCollections,
    otherwise(pipe(captureAndLogError, always([])))
  )()
  return <CollectionsPage collections={collections} />
}

export default withUser(render)
