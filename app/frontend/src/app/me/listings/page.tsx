import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { setListingRole } from '@echo/frontend/lib/helpers/listing/set-listing-role'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import { NAVIGATION_LISTINGS } from '@echo/ui/constants/navigation-item'
import { ProfileListings } from '@echo/ui/pages/profile/listings/profile-listings'
import { ProfileNavigationLayout } from '@echo/ui/pages/profile/navigation/profile-navigation-layout'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { andThen, path, pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render(params: NextAuthUserParams) {
  const listings = await pipe(
    nonNullableReturn(path(['user', 'username'])),
    getListingsForCreator,
    andThen(setListingRole(params.user))
  )(params)
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_LISTINGS}>
      <ProfileListings listings={listings} />
    </ProfileNavigationLayout>
  )
}

export default pipe(withLocale<NextAuthUserParams, Promise<ReactElement>>, withUser)(render)
