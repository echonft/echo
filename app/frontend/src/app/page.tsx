import { getCompletedOffers } from '@echo/firestore/crud/offer/get-completed-offers'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { getCollectionsWithSwapsCount } from '@echo/frontend/lib/helpers/collection/get-collections-with-swaps-count'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { Home } from '@echo/ui/components/home/home'
import { PageLayout } from '@echo/ui/components/layout/page-layout'
import { PAGE_LAYOUT_BG_HOME } from '@echo/ui/constants/page-layout-background'

async function render() {
  const user = await initializeServerComponent({ getAuthUser: true })
  const collections = await getCollectionsWithSwapsCount(10)
  const offers = await getCompletedOffers(5)
  return (
    <PageLayout user={user} background={PAGE_LAYOUT_BG_HOME}>
      <Home collections={collections} offers={offers} />
    </PageLayout>
  )
}

export default withLocale(render)
