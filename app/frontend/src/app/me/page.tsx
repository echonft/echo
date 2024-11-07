import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { getPendingListingsForUser } from '@echo/firestore/crud/listing/get-pending-listings-for-user'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import { getSwapsForUser } from '@echo/firestore/crud/swap/get-swaps-for-user'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { toListingsWithRole } from '@echo/frontend/lib/helpers/listing/to-listings-with-role'
import { toOffersWithRole } from '@echo/frontend/lib/helpers/offer/to-offers-with-role'
import { otherwiseEmptyArray } from '@echo/frontend/lib/helpers/otherwise-empty-array'
import { toSwaps } from '@echo/frontend/lib/helpers/swap/to-swaps'
import type { Slug } from '@echo/model/types/slug'
import type { User } from '@echo/model/types/user'
import { getSelectionFromSearchParams } from '@echo/routing/search-params/get-selection-from-search-params'
import { NavigationLayout } from '@echo/ui/components/base/layout/navigation-layout'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { AuthUserProfile } from '@echo/ui/components/user/profile/auth-user-profile'
import { ProfileTabs } from '@echo/ui/pages/profile/profile-tabs'
import { andThen, pipe, prop } from 'ramda'

interface Props {
  searchParams: {
    offer?: Slug
    listing?: Slug
    swap?: Slug
  }
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
  const swaps = await pipe(prop('username'), getSwapsForUser, andThen(toSwaps), otherwiseEmptyArray)(user)
  const selection = getSelectionFromSearchParams({ listings, offers, swaps, searchParams })

  return (
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
  )
}

export default withLoggedInUser(render)
