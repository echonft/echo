import { getRankedCollections } from '@echo/firestore/crud/collection/counts/get-ranked-collections'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import type { WithUserProps } from '@echo/frontend/lib/types/with-user-props'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { Background } from '@echo/ui/constants/background'
import { CollectionsPage } from '@echo/ui/pages/collections/collections-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { always, otherwise, pipe } from 'ramda'

async function render({ user }: WithUserProps) {
  const collections = await pipe<[], Promise<CollectionWithRank[]>, Promise<CollectionWithRank[]>>(
    getRankedCollections,
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
