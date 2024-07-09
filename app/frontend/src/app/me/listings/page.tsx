import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { setListingRole } from '@echo/frontend/lib/helpers/listing/set-listing-role'
import type { WithAuthUserProps } from '@echo/frontend/lib/types/with-auth-user-props'
import { NAVIGATION_LISTINGS } from '@echo/ui/constants/navigation-item'
import { ProfileListings } from '@echo/ui/pages/profile/listings/profile-listings'
import { ProfileNavigationLayout } from '@echo/ui/pages/profile/navigation/profile-navigation-layout'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { always, andThen, otherwise, path, pipe } from 'ramda'

async function render(params: WithAuthUserProps) {
  const listings = await pipe(
    nonNullableReturn(path(['user', 'username'])),
    getListingsForCreator,
    andThen(setListingRole(params.user)),
    otherwise(pipe(captureAndLogError, always([])))
  )(params)
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_LISTINGS}>
      <ProfileListings listings={listings} />
    </ProfileNavigationLayout>
  )
}

export default withLoggedInUser(render)
