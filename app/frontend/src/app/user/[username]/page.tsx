import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getPendingOffersForUser } from '@echo/firestore/crud/offer/get-pending-offers-for-user'
import { getSwapsForUser } from '@echo/firestore/crud/swap/get-swaps-for-user'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getUserOffersCount } from '@echo/firestore/crud/user/get-user-offers-count'
import { getWalletForUser } from '@echo/firestore/crud/wallet/get-wallet-for-user'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { toListingsWithRole } from '@echo/frontend/lib/helpers/listing/to-listings-with-role'
import { toOffersWithRole } from '@echo/frontend/lib/helpers/offer/to-offers-with-role'
import { toSwaps } from '@echo/frontend/lib/helpers/swap/to-swaps'
import type { Slug } from '@echo/model/types/slug'
import type { User } from '@echo/model/types/user'
import type { Username } from '@echo/model/types/username'
import { getSelectionFromSearchParams } from '@echo/routing/search-params/get-selection-from-search-params'
import { NavigationLayout } from '@echo/ui/components/base/layout/navigation-layout'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { UserProfile } from '@echo/ui/components/user/profile/user-profile'
import { UserTabs } from '@echo/ui/pages/user/user-tabs'
import type { Nullable } from '@echo/utils/types/nullable'
import { notFound } from 'next/navigation'
import { always, andThen, isNil, otherwise, pipe } from 'ramda'

interface Props {
  params: {
    username: Username
  }
  searchParams: {
    items: string[] | string
    target?: Slug
  }
  user: Nullable<User>
}

async function render({ params: { username }, searchParams, user: authUser }: Props) {
  const user = await pipe(getUserByUsername, otherwise(pipe(captureAndLogError, always(undefined))))(username)
  if (isNil(user)) {
    notFound()
  }
  const wallet = await pipe(getWalletForUser, otherwise(pipe(captureAndLogError, always(undefined))))(user.username)
  const isAuthUser = username === authUser?.username
  const nfts = await pipe(getNftsForOwner, otherwise(pipe(captureAndLogError, always([]))))(username)
  const listings = await pipe(
    getListingsForCreator,
    andThen(toListingsWithRole(authUser)),
    otherwise(pipe(captureAndLogError, always([])))
  )(username)
  const offers = await pipe(
    getPendingOffersForUser,
    andThen(toOffersWithRole(authUser)),
    otherwise(pipe(captureAndLogError, always([])))
  )(username)
  const offersCount = await pipe(getUserOffersCount, otherwise(pipe(captureAndLogError, always(0))))(username)
  const swaps = await pipe(getSwapsForUser, andThen(toSwaps), otherwise(pipe(captureAndLogError, always([]))))(username)
  const selection = getSelectionFromSearchParams({ listings, offers, swaps, searchParams })

  return (
    <NavigationLayout>
      <SectionLayout>
        <UserProfile
          address={wallet.address}
          user={user}
          listingsCount={listings.length}
          nftsCount={nfts.length}
          offersCount={offersCount}
          swapsCount={swaps.length}
        />
      </SectionLayout>
      <NavigationSectionLayout>
        <UserTabs
          isAuthUser={isAuthUser}
          listings={listings}
          nfts={nfts}
          offers={offers}
          swaps={swaps}
          selection={selection}
        />
      </NavigationSectionLayout>
    </NavigationLayout>
  )
}

export default withUser(render)
