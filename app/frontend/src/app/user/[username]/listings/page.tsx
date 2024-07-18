import { pathProvider } from '@echo/api/routing/path-provider'
import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { setListingRole } from '@echo/frontend/lib/helpers/listing/set-listing-role'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import type { WithUsername } from '@echo/model/types/with-username'
import { NAVIGATION_LISTINGS } from '@echo/ui/constants/navigation-item'
import { UserListings } from '@echo/ui/pages/user/listings/user-listings'
import { UserNavigationLayout } from '@echo/ui/pages/user/navigation/user-navigation-layout'
import { redirect } from 'next/navigation'
import { always, andThen, otherwise, pipe } from 'ramda'

async function render({ params: { username }, user }: PropsWithUser<NextParams<WithUsername>>) {
  if (user?.username === username) {
    redirect(pathProvider.profile.listings.get())
  }
  const listings = await pipe(
    getListingsForCreator,
    andThen(setListingRole(user)),
    otherwise(pipe(captureAndLogError, always([])))
  )(username)
  return (
    <UserNavigationLayout username={username} activeNavigationItem={NAVIGATION_LISTINGS}>
      <UserListings username={username} listings={listings} />
    </UserNavigationLayout>
  )
}

export default withUser(render)
