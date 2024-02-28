import { linkProvider } from '@echo/api/routing/link-provider'
import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { setListingRole } from '@echo/frontend/lib/helpers/listing/set-listing-role'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import type { WithUsername } from '@echo/model/types/with-username'
import { NAVIGATION_LISTINGS } from '@echo/ui/constants/navigation-item'
import { UserListings } from '@echo/ui/pages/user/listings/user-listings'
import { UserNavigationLayout } from '@echo/ui/pages/user/navigation/user-navigation-layout'
import { redirect } from 'next/navigation'
import { andThen, pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<WithUsername>>
async function render({ params: { username }, user }: Params) {
  if (user?.username === username) {
    redirect(linkProvider.profile.listings.get())
  }
  const listings = await pipe(getListingsForCreator, andThen(setListingRole(user)))(username)
  return (
    <UserNavigationLayout username={username} activeNavigationItem={NAVIGATION_LISTINGS}>
      <UserListings username={username} listings={listings} />
    </UserNavigationLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
