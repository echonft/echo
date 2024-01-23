import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { mapFirestoreUserToUserProfile } from '@echo/frontend/lib/mappers/map-firestore-user-to-user-profile'
import type { NextLayoutParams } from '@echo/frontend/lib/types/next-layout-params'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/navigation/navigation-page-layout'
import { UserDetailsApiProvided } from '@echo/ui/components/user/api-provided/user-details-api-provided'
import { notFound } from 'next/navigation'
import { isNil } from 'ramda'

export default async function ({
  params: { username },
  children
}: NextLayoutParams<NextParams<Record<'username', string>>>) {
  const authUser = await initializeServerComponent({ getAuthUser: true })
  const user = await findUserByUsername(username)
  if (isNil(user)) {
    notFound()
  }
  const wallets = await getWalletsForUser(user.username)
  return (
    <NavigationPageLayout user={authUser}>
      <SectionLayout>
        <UserDetailsApiProvided user={mapFirestoreUserToUserProfile(user, wallets)} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}
