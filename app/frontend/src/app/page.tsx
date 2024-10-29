import { getRankedCollections } from '@echo/firestore/crud/collection/get-ranked-collections'
import { getSwaps } from '@echo/firestore/crud/swap/get-swaps'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { HomePage } from '@echo/ui/pages/home/home-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { always, otherwise, pipe } from 'ramda'

async function render() {
  const collections = await pipe<[number], Promise<CollectionWithRank[]>, Promise<CollectionWithRank[]>>(
    getRankedCollections,
    otherwise(pipe(captureAndLogError, always([])))
  )(10)
  const swaps = await getSwaps(5)

  return <HomePage collections={collections} swaps={swaps} />
}

export default withUser(render)
