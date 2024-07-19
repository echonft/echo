import type { SelectionSearchParams } from '@echo/api/types/routing/search-params/selection-search-params'
import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getCompletedOffersForUser } from '@echo/firestore/crud/offer/get-completed-offers-for-user'
import { getOffersForSender } from '@echo/firestore/crud/offer/get-offers-for-sender'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { getPageSelection } from '@echo/frontend/lib/helpers/get-page-selection'
import { setListingsRole } from '@echo/frontend/lib/helpers/listing/set-listings-role'
import { setOfferRoleForUser } from '@echo/frontend/lib/helpers/offer/set-offer-role-for-user'
import { getUserProfile } from '@echo/frontend/lib/helpers/user/get-user-profile'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import type { WithSearchParamsProps } from '@echo/frontend/lib/types/with-search-params-props'
import type { Swap } from '@echo/model/types/swap'
import type { WithUsername } from '@echo/model/types/with-username'
import { NavigationPageLayout } from '@echo/ui/components/base/layout/navigation-page-layout'
import { NavigationSectionLayout } from '@echo/ui/components/base/layout/navigation-section-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { UserProfile } from '@echo/ui/components/user/profile/user-profile'
import { UserTabs } from '@echo/ui/pages/user/user-tabs'
import { notFound } from 'next/navigation'
import { always, andThen, isNil, map, otherwise, pipe } from 'ramda'

async function render({
  params: { username },
  searchParams,
  user: authUser
}: PropsWithUser<NextParams<WithUsername> & WithSearchParamsProps<SelectionSearchParams>>) {
  const user = await pipe(getUserByUsername, otherwise(pipe(captureAndLogError, always(undefined))))(username)
  if (isNil(user)) {
    notFound()
  }
  const profile = await pipe(getUserProfile, otherwise(pipe(captureAndLogError, always(undefined))))(user)
  if (isNil(profile)) {
    notFound()
  }
  const isAuthUser = username === authUser?.username
  const nfts = await pipe(getNftsForOwner, otherwise(pipe(captureAndLogError, always([]))))(username)
  const listings = await pipe(
    getListingsForCreator,
    andThen(setListingsRole(user)),
    otherwise(pipe(captureAndLogError, always([])))
  )(username)
  const offers = await pipe(
    getOffersForSender,
    andThen(map(setOfferRoleForUser(authUser))),
    otherwise(pipe(captureAndLogError, always([])))
  )(username)
  const swaps = (await pipe(
    getCompletedOffersForUser,
    otherwise(pipe(captureAndLogError, always([])))
  )(username)) as Swap[]
  const selection = getPageSelection({ listings, offers, swaps, searchParams })

  return (
    <NavigationPageLayout user={authUser}>
      <SectionLayout>
        <UserProfile profile={profile} />
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
    </NavigationPageLayout>
  )
}

export default withUser(render)
