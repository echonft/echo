import { getRankedCollections } from '@echo/firestore/crud/collection/counts/get-ranked-collections'
import { getSwaps } from '@echo/firestore/crud/swap/get-swaps'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import type { WithUserProps } from '@echo/frontend/lib/types/with-user-props'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { Background } from '@echo/ui/constants/background'
import { HomePage } from '@echo/ui/pages/home/home-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { always, otherwise, pipe } from 'ramda'

async function render({ user }: WithUserProps) {
  const collections = await pipe<[number], Promise<CollectionWithRank[]>, Promise<CollectionWithRank[]>>(
    getRankedCollections,
    otherwise(pipe(captureAndLogError, always([])))
  )(10)
  const swaps = await getSwaps(5)
  return (
    <PageLayout user={user} background={Background.Home}>
      <HomePage collections={collections} swaps={swaps} />
    </PageLayout>
  )
}

export default withUser(render)
