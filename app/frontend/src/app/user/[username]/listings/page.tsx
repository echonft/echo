import { linkProvider } from '@echo/api/services/routing/link-provider'
import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { NAVIGATION_LISTINGS } from '@echo/ui/constants/navigation-item'
import { UserListings } from '@echo/ui/pages/user/listings/user-listings'
import { UserNavigationLayout } from '@echo/ui/pages/user/navigation/user-navigation-layout'
import { redirect } from 'next/navigation'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<Record<'username', string>>>
async function render({ params: { username }, user }: Params) {
  if (user?.username === username) {
    redirect(linkProvider.profile.listingsCreated.get())
  }
  // TODO use ListingWithRole
  const listings = await getListingsForCreator(username)
  return (
    <UserNavigationLayout username={username} activeNavigationItem={NAVIGATION_LISTINGS}>
      <UserListings user={user} username={username} listings={listings} />
    </UserNavigationLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
