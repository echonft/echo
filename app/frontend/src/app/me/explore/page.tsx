import { getPendingListingsForUser } from '@echo/firestore/crud/listing/get-pending-listings-for-user'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { setListingRole } from '@echo/frontend/lib/helpers/listing/set-listing-role'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import { NAVIGATION_EXPLORE } from '@echo/ui/constants/navigation-item'
import { ProfileExplore } from '@echo/ui/pages/profile/explore/profile-explore'
import { ProfileNavigationLayout } from '@echo/ui/pages/profile/navigation/profile-navigation-layout'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { andThen, path, pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render(params: NextAuthUserParams) {
  const listings = await pipe(
    nonNullableReturn(path(['user', 'username'])),
    getPendingListingsForUser,
    andThen(setListingRole(params.user))
  )(params)
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_EXPLORE}>
      <ProfileExplore listings={listings} />
    </ProfileNavigationLayout>
  )
}

export default pipe(withLocale<NextAuthUserParams, Promise<ReactElement>>, withUser)(render)
