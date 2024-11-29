import { getRankedCollections } from '@echo/firestore/crud/collection/get-ranked-collections'
import { getSwaps } from '@echo/firestore/crud/swap/get-swaps'
import { initializeFirestore } from '@echo/firestore/services/initialize-firestore'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { otherwiseEmptyArray } from '@echo/frontend/lib/helpers/otherwise-empty-array'
import { toSwapsWithRole } from '@echo/frontend/lib/helpers/swap/to-swaps-with-role'
import type { User } from '@echo/model/types/user'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'
import { HomePage } from '@echo/ui/pages/home/home-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import type { Nullable } from '@echo/utils/types/nullable'
import { andThen, pipe } from 'ramda'

interface Props {
  user: Nullable<User>
}

async function render({ user }: Props) {
  await initializeFirestore()
  const collections = await pipe<[number], Promise<CollectionWithRank[]>, Promise<CollectionWithRank[]>>(
    getRankedCollections,
    otherwiseEmptyArray
  )(10)
  const swaps = await pipe(getSwaps, andThen(toSwapsWithRole(user)), otherwiseEmptyArray)(5)
  return (
    <PageLayout background={PageLayoutBackground.Home}>
      <Header />
      <MainSectionLayout>
        <HomePage collections={collections} swaps={swaps} />
      </MainSectionLayout>
    </PageLayout>
  )
}

export default withUser(render)
