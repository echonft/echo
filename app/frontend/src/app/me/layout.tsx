import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { getUserProfile } from '@echo/frontend/lib/helpers/user/get-user-profile'
import type { NextAuthUserParams } from '@echo/frontend/lib/types/next-auth-user-params'
import type { NextLayoutParams } from '@echo/frontend/lib/types/next-layout-params'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { AuthUserProfile } from '@echo/ui/components/user/profile/auth-user-profile'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render({ user, children }: NextAuthUserParams<NextLayoutParams>) {
  const profile = await getUserProfile(user)
  return (
    <NavigationPageLayout user={user}>
      <SectionLayout>
        <AuthUserProfile profile={profile} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default pipe(withLocale<NextAuthUserParams<NextLayoutParams>, Promise<ReactElement>>, withLoggedInUser)(render)
