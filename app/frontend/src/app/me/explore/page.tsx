import { getPendingListingsForUser } from '@echo/firestore/crud/listing/get-pending-listings-for-user'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { setListingRole } from '@echo/frontend/lib/helpers/listing/set-listing-role'
import type { WithAuthUserProps } from '@echo/frontend/lib/types/with-auth-user-props'
import { NAVIGATION_EXPLORE } from '@echo/ui/constants/navigation-item'
import { ProfileExplore } from '@echo/ui/pages/profile/explore/profile-explore'
import { ProfileNavigationLayout } from '@echo/ui/pages/profile/navigation/profile-navigation-layout'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { andThen, path, pipe } from 'ramda'

async function render(props: WithAuthUserProps) {
  const listings = await pipe(
    nonNullableReturn(path(['user', 'username'])),
    getPendingListingsForUser,
    andThen(setListingRole(props.user))
  )(props)
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_EXPLORE}>
      <ProfileExplore listings={listings} />
    </ProfileNavigationLayout>
  )
}

export default withLoggedInUser(render)
