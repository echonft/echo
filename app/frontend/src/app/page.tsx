import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import { getAllCollectionsWithSwapsCount } from '@echo/frontend/lib/helpers/collection/get-all-collections-with-swaps-count'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { Home } from '@echo/ui/components/home/home'
import { PageLayout } from '@echo/ui/components/layout/page-layout'
import { PAGE_LAYOUT_BG_HOME } from '@echo/ui/constants/page-layout-background'

export default async function () {
  const user = await initializeServerComponent({ getAuthUser: true })
  const collections = await getAllCollectionsWithSwapsCount({
    select: ['id', 'slug', 'profilePictureUrl', 'name'],
    orderBy: [
      { field: 'swapsCount', direction: 'desc' },
      { field: 'name', direction: 'asc' }
    ],
    limit: 10
  })
  const offers = await getAllOffers(
    { state: [OFFER_STATE_COMPLETED] },
    {
      orderBy: [{ field: 'updatedAt', direction: 'desc' }],
      limit: 5
    }
  )
  return (
    <PageLayout user={user} background={PAGE_LAYOUT_BG_HOME}>
      <Home collections={collections} offers={offers} />
    </PageLayout>
  )
}
