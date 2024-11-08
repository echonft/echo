import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { getPendingListingsForUser } from '@echo/firestore/crud/listing/get-pending-listings-for-user'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import { getSwapsForUser } from '@echo/firestore/crud/swap/get-swaps-for-user'
import { getUserOffersCount } from '@echo/firestore/crud/user/get-user-offers-count'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { toListingsWithRole } from '@echo/frontend/lib/helpers/listing/to-listings-with-role'
import { toOffersWithRole } from '@echo/frontend/lib/helpers/offer/to-offers-with-role'
import { otherwiseEmptyArray } from '@echo/frontend/lib/helpers/otherwise-empty-array'
import { toSwaps } from '@echo/frontend/lib/helpers/swap/to-swaps'
import type { User } from '@echo/model/types/user'
import type { SelectionSearchParams } from '@echo/routing/types/frontend/search-params/selection-search-params'
import { selectionSearchParamsDataSchema } from '@echo/routing/validators/frontend/selection/selection-search-params-data-schema'
import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { NavigationLayout } from '@echo/ui/components/base/layout/navigation-layout'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { AuthUserProfile } from '@echo/ui/components/user/profile/auth-user-profile'
import { ProfileTabs } from '@echo/ui/pages/profile/profile-tabs'
import { always, andThen, otherwise, pipe, prop } from 'ramda'

interface Props {
  searchParams?: SelectionSearchParams
  user: User
}

async function render({ searchParams, user }: Props) {
  const nfts = await pipe(prop('username'), getNftsForOwner, otherwiseEmptyArray)(user)
  const listings = await pipe(
    prop('username'),
    getListingsForCreator,
    andThen(toListingsWithRole(user)),
    otherwiseEmptyArray
  )(user)
  const pendingListings = await pipe(
    prop('username'),
    getPendingListingsForUser,
    andThen(toListingsWithRole(user)),
    otherwiseEmptyArray
  )(user)
  const offers = await pipe(
    prop('username'),
    getOffersForUser,
    andThen(toOffersWithRole(user)),
    otherwiseEmptyArray
  )(user)
  const offersCount = await pipe(prop('username'), getUserOffersCount, otherwise(always(0)))(user)
  const swaps = await pipe(prop('username'), getSwapsForUser, andThen(toSwaps), otherwiseEmptyArray)(user)
  const selection = selectionSearchParamsDataSchema.parse({ listings, offers, swaps, searchParams })

  return (
    <PageLayout>
      <Header user={user} />
      <MainSectionLayout>
        <NavigationLayout>
          <SectionLayout>
            <AuthUserProfile
              user={user}
              listingsCount={listings.length}
              nftsCount={nfts.length}
              offersCount={offers.length}
              swapsCount={swaps.length}
            />
          </SectionLayout>
          <NavigationSectionLayout>
            <ProfileTabs
              listings={listings}
              nfts={nfts}
              offers={offers}
              pendingListings={pendingListings}
              swaps={swaps}
              selection={selection}
            />
          </NavigationSectionLayout>
        </NavigationLayout>
        <CalloutManager />
      </MainSectionLayout>
    </PageLayout>
  )
}

export default withLoggedInUser(render)
