import { getRankedCollections } from '@echo/firestore/crud/collection/get-ranked-collections'
import { getSwaps } from '@echo/firestore/crud/swap/get-swaps'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { otherwiseEmptyArray } from '@echo/frontend/lib/helpers/otherwise-empty-array'
import { HomePage } from '@echo/ui/pages/home/home-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { pipe } from 'ramda'

async function render() {
  const collections = await pipe<[number], Promise<CollectionWithRank[]>, Promise<CollectionWithRank[]>>(
    getRankedCollections,
    otherwiseEmptyArray
  )(10)
  const swaps = await getSwaps(5)

  return <HomePage collections={collections} swaps={swaps} />
}

export default withUser(render)
