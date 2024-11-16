import { getRankedCollections } from '@echo/firestore/crud/collection/get-ranked-collections'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { otherwiseEmptyArray } from '@echo/frontend/lib/helpers/otherwise-empty-array'
import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'
import { CollectionsPage } from '@echo/ui/pages/collections/collections-page'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { pipe } from 'ramda'

export default async function render() {
  await initializeFirebase()
  const collections = await pipe<[], Promise<CollectionWithRank[]>, Promise<CollectionWithRank[]>>(
    getRankedCollections,
    otherwiseEmptyArray
  )()
  return (
    <PageLayout background={PageLayoutBackground.Collections}>
      <Header />
      <MainSectionLayout>
        <CollectionsPage collections={collections} />
        <CalloutManager />
      </MainSectionLayout>
    </PageLayout>
  )
}
