import { getCollectionsWithSwapsCount } from '@echo/firestore/crud/collection-with-counts/get-collections-with-swaps-count'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import type { WithUserProps } from '@echo/frontend/lib/types/with-user-props'
import type { Collection } from '@echo/model/types/collection/collection'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { Background } from '@echo/ui/constants/background'
import { CollectionsPage } from '@echo/ui/pages/collections/collections-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { addIndex, always, andThen, assoc, map, otherwise, pipe } from 'ramda'

async function render({ user }: WithUserProps) {
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
  return (
    <PageLayout user={user} background={Background.Collections}>
      <SectionLayout>
        <CollectionsPage collections={collections} />
      </SectionLayout>
    </PageLayout>
  )
}

export default withUser(render)
