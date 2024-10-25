import type { User } from '@echo/auth/types/user'
import { getRankedCollections } from '@echo/firestore/crud/collection/counts/get-ranked-collections'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { Background } from '@echo/ui/constants/background'
import { CollectionsPage } from '@echo/ui/pages/collections/collections-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import type { Nullable } from '@echo/utils/types/nullable'
import { always, otherwise, pipe } from 'ramda'

interface Props {
  user: Nullable<User>
}

async function render({ user }: Props) {
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
