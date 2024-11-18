import { getRankedCollections } from '@echo/firestore/crud/collection/get-ranked-collections'
import { getSwaps } from '@echo/firestore/crud/swap/get-swaps'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { otherwiseEmptyArray } from '@echo/frontend/lib/helpers/otherwise-empty-array'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'
import { HomePage } from '@echo/ui/pages/home/home-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { pipe } from 'ramda'

export default async function render() {
  await initializeFirebase()
  const collections = await pipe<[number], Promise<CollectionWithRank[]>, Promise<CollectionWithRank[]>>(
    getRankedCollections,
    otherwiseEmptyArray
  )(10)
  const swaps = await getSwaps(5)
  return (
    <PageLayout background={PageLayoutBackground.Home}>
      <Header />
      <MainSectionLayout>
        <HomePage collections={collections} swaps={swaps} />
      </MainSectionLayout>
    </PageLayout>
  )
}
