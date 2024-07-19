import { pathProvider } from '@echo/api/routing/path-provider'
import type { SelectionSearchParams } from '@echo/api/types/routing/search-params/selection-search-params'
import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { getPendingListingsForUser } from '@echo/firestore/crud/listing/get-pending-listings-for-user'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getCompletedOffersForUser } from '@echo/firestore/crud/offer/get-completed-offers-for-user'
import { getPendingOffersForUser } from '@echo/firestore/crud/offer/get-pending-offers-for-user'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { getPageSelection } from '@echo/frontend/lib/helpers/get-page-selection'
import { setListingsRole } from '@echo/frontend/lib/helpers/listing/set-listings-role'
import { setOfferRoleReceiver } from '@echo/frontend/lib/helpers/offer/set-offer-role-receiver'
import { getUserProfile } from '@echo/frontend/lib/helpers/user/get-user-profile'
import type { PropsWithAuthUser } from '@echo/frontend/lib/types/props-with-auth-user'
import type { WithSearchParamsProps } from '@echo/frontend/lib/types/with-search-params-props'
import type { Nft } from '@echo/model/types/nft'
import type { Swap } from '@echo/model/types/swap'
import { NavigationPageLayout } from '@echo/ui/components/base/layout/navigation-page-layout'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { AuthUserProfile } from '@echo/ui/components/user/profile/auth-user-profile'
import { ProfileTabs } from '@echo/ui/pages/profile/profile-tabs'
import { redirect } from 'next/navigation'
import { always, andThen, isNil, map, otherwise, pipe, prop } from 'ramda'

async function render({ searchParams, user }: PropsWithAuthUser<WithSearchParamsProps<SelectionSearchParams>>) {
  const profile = await pipe(getUserProfile, otherwise(pipe(captureAndLogError, always(undefined))))(user)
  if (isNil(profile)) {
    redirect(pathProvider.base.home.get())
  }
  const nfts: Nft[] = await pipe(
    prop('username'),
    getNftsForOwner,
    otherwise(pipe(captureAndLogError, always([])))
  )(user)
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
    getPendingOffersForUser,
    andThen(map(setOfferRoleReceiver)),
    otherwise(pipe(captureAndLogError, always([])))
  )(user)
  const swaps = (await pipe(
    prop('username'),
    getCompletedOffersForUser,
    otherwise(pipe(captureAndLogError, always([])))
  )(user)) as Swap[]
  const selection = getPageSelection({ listings, offers, swaps, searchParams })

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

export default withUser(render)
