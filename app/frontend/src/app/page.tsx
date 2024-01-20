import { getAllOffers } from '@echo/firestore/crud/offer/get-all-offers'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { getAllCollectionsWithSwapsCount } from '@echo/frontend/lib/server/helpers/collection/get-all-collections-with-swaps-count'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { Home } from '@echo/ui/components/home/home'
import { PageLayout } from '@echo/ui/components/layout/page-layout'
import { PAGE_LAYOUT_BG_HOME } from '@echo/ui/constants/page-layout-background'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const HomePage: FunctionComponent = async () => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
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

export default HomePage
