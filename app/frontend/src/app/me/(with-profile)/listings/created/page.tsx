import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import { NAVIGATION_LISTINGS_CREATED } from '@echo/ui/constants/navigation-item'
import { setListingRoleForUser } from '@echo/ui/helpers/listing/set-listing-role-for-user'
import { ProfileListingsCreated } from '@echo/ui/pages/profile/listings/profile-listings-created'
import { ProfileNavigationLayout } from '@echo/ui/pages/profile/navigation/profile-navigation-layout'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { andThen, map, path, pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render(params: NextAuthUserParams) {
  const listings = await pipe(
    nonNullableReturn(path(['user', 'username'])),
    getListingsForCreator,
    andThen(map(setListingRoleForUser(params.user)))
  )(params)
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_LISTINGS_CREATED}>
      <ProfileListingsCreated listings={listings} />
    </ProfileNavigationLayout>
  )
}

export default pipe(withLocale<NextAuthUserParams, Promise<ReactElement>>, withUser)(render)
