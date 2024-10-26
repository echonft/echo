import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { getPendingListingsForUser } from '@echo/firestore/crud/listing/get-pending-listings-for-user'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getOffersForUser } from '@echo/firestore/crud/offer/get-offers-for-user'
import { getSwapsForUser } from '@echo/firestore/crud/swap/get-swaps-for-user'
import { getUserProfile } from '@echo/firestore/crud/user/get-user-profile'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import type { Slug } from '@echo/model/types/slug'
import type { User } from '@echo/model/types/user'
import { pathProvider } from '@echo/routing/path/path-provider'
import { getSelectionFromSearchParams } from '@echo/routing/search-params/get-selection-from-search-params'
import { NavigationPageLayout } from '@echo/ui/components/base/layout/navigation-page-layout'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { AuthUserProfile } from '@echo/ui/components/user/profile/auth-user-profile'
import { setListingsRole } from '@echo/ui/helpers/listing/set-listings-role'
import { setOfferRoleForUser } from '@echo/ui/helpers/offer/set-offer-role-for-user'
import { ProfileTabs } from '@echo/ui/pages/profile/profile-tabs'
import { redirect } from 'next/navigation'
import { always, andThen, isNil, map, otherwise, pipe, prop } from 'ramda'

interface Props {
  searchParams: {
    offer?: Slug
    listing?: Slug
    swap?: Slug
  }
  user: User
}

async function render({ searchParams, user }: Props) {
  const profile = await pipe(getUserProfile, otherwise(pipe(captureAndLogError, always(undefined))))(user)
  if (isNil(profile)) {
    redirect(pathProvider.base.home.get())
  }
  const nfts = await pipe(prop('username'), getNftsForOwner, otherwise(pipe(captureAndLogError, always([]))))(user)
  const listings = await pipe(
    prop('username'),
    getListingsForCreator,
    andThen(setListingsRole(user)),
    otherwise(pipe(captureAndLogError, always([])))
  )(user)
  const pendingListings = await pipe(
    prop('username'),
    getPendingListingsForUser,
    andThen(setListingsRole(user)),
    otherwise(pipe(captureAndLogError, always([])))
  )(user)
  const offers = await pipe(
    prop('username'),
    getOffersForUser,
    andThen(map(setOfferRoleForUser(user))),
    otherwise(pipe(captureAndLogError, always([])))
  )(user)
  const swaps = await pipe(prop('username'), getSwapsForUser, otherwise(pipe(captureAndLogError, always([]))))(user)
  const selection = getSelectionFromSearchParams({ listings, offers, swaps, searchParams })

  return (
    <NavigationPageLayout user={user}>
      <SectionLayout>
        <AuthUserProfile profile={profile} />
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
