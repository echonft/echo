import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { getAuthUser } from '@echo/frontend/lib/auth/get-auth-user'
import { withFirebase } from '@echo/frontend/lib/hoc/with-firebase'
import { mapFirestoreUserToUserProfile } from '@echo/frontend/lib/mappers/map-firestore-user-to-user-profile'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/navigation/navigation-page-layout'
import { UserDetailsApiProvided } from '@echo/ui/components/user/api-provided/user-details-api-provided'
import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { isNil } from 'ramda'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  params: {
    username: string
  }
}

const UserLayout: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { username }, children }) => {
  unstable_setRequestLocale('en')
  const authUser = await getAuthUser()
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

export default withFirebase(UserLayout)
