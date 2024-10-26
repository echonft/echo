import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { getPendingListingsForUser } from '@echo/firestore/crud/listing/get-pending-listings-for-user'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import { getSwapsForUser } from '@echo/firestore/crud/swap/get-swaps-for-user'
import { getWalletForUser } from '@echo/firestore/crud/wallet/get-wallet-for-user'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { toListingsWithRole } from '@echo/frontend/lib/helpers/listing/to-listings-with-role'
import { toOffersWithRole } from '@echo/frontend/lib/helpers/offer/to-offers-with-role'
import { toSwaps } from '@echo/frontend/lib/helpers/swap/to-swaps'
import type { Slug } from '@echo/model/types/slug'
import type { User } from '@echo/model/types/user'
import { getSelectionFromSearchParams } from '@echo/routing/search-params/get-selection-from-search-params'
import { NavigationPageLayout } from '@echo/ui/components/base/layout/navigation-page-layout'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { AuthUserProfile } from '@echo/ui/components/user/profile/auth-user-profile'
import { ProfileTabs } from '@echo/ui/pages/profile/profile-tabs'
import { always, andThen, otherwise, pipe, prop } from 'ramda'

interface Props {
  searchParams: {
    offer?: Slug
    listing?: Slug
    swap?: Slug
  }
  user: User
}

async function render({ searchParams, user }: Props) {
  const wallet = await pipe(getWalletForUser, otherwise(pipe(captureAndLogError, always(undefined))))(user.username)
  const nfts = await pipe(prop('username'), getNftsForOwner, otherwise(pipe(captureAndLogError, always([]))))(user)
  const listings = await pipe(
    prop('username'),
    getListingsForCreator,
    andThen(toListingsWithRole(user)),
    otherwise(pipe(captureAndLogError, always([])))
  )(user)
  const pendingListings = await pipe(
    prop('username'),
    getPendingListingsForUser,
    andThen(toListingsWithRole(user)),
    otherwise(pipe(captureAndLogError, always([])))
  )(user)
  const offers = await pipe(
    prop('username'),
    getOffersForUser,
    andThen(toOffersWithRole(user)),
    otherwise(pipe(captureAndLogError, always([])))
  )(user)
  const swaps = await pipe(
    prop('username'),
    getSwapsForUser,
    andThen(toSwaps),
    otherwise(pipe(captureAndLogError, always([])))
  )(user)
  const selection = getSelectionFromSearchParams({ listings, offers, swaps, searchParams })

  return (
    <NavigationPageLayout user={user}>
      <SectionLayout>
        <AuthUserProfile
          address={wallet.address}
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
    </NavigationPageLayout>
  )
}

export default withLoggedInUser(render)
