import { getPendingListingsForUser } from '@echo/firestore/crud/listing/get-pending-listings-for-user'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { setListingsRole } from '@echo/frontend/lib/helpers/listing/set-listings-role'
import type { WithAuthUserProps } from '@echo/frontend/lib/types/with-auth-user-props'
import { NAVIGATION_EXPLORE } from '@echo/ui/constants/navigation-item'
import { ProfileExplore } from '@echo/ui/pages/profile/explore/profile-explore'
import { ProfileNavigationLayout } from '@echo/ui/pages/profile/navigation/profile-navigation-layout'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { always, andThen, otherwise, path, pipe } from 'ramda'

async function render(props: WithAuthUserProps) {
  const listings = await pipe(
    nonNullableReturn(path(['user', 'username'])),
    getPendingListingsForUser,
    andThen(setListingsRole(props.user)),
    otherwise(pipe(captureAndLogError, always([])))
  )(props)
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_EXPLORE}>
      <ProfileExplore listings={listings} />
    </ProfileNavigationLayout>
  )
}

export default withLoggedInUser(render)
