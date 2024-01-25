import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { mapFirestoreUserToUserProfile } from '@echo/frontend/lib/mappers/map-firestore-user-to-user-profile'
import type { NextLayoutParams } from '@echo/frontend/lib/types/next-layout-params'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { notFound } from 'next/navigation'
import { isNil, pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextLayoutParams<NextParams<Record<'username', string>>>>
async function render({ params: { username }, user: authUser, children }: Params) {
  const user = await findUserByUsername(username)
  if (isNil(user)) {
    notFound()
  }
  const wallets = await getWalletsForUser(user.username)
  return (
    <NavigationPageLayout user={authUser}>
      <SectionLayout>
        <UserDetails user={mapFirestoreUserToUserProfile(user, wallets)} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
