import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { getUserProfile } from '@echo/frontend/lib/helpers/user/get-user-profile'
import type { NextLayoutParams } from '@echo/frontend/lib/types/next-layout-params'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { UserProfile } from '@echo/ui/components/user/profile/user-profile'
import { notFound } from 'next/navigation'
import { isNil, pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextLayoutParams<NextParams<Record<'username', string>>>>
async function render({ params: { username }, user: authUser, children }: Params) {
  const user = await findUserByUsername(username)
  if (isNil(user)) {
    notFound()
  }
  const profile = await getUserProfile(user)
  return (
    <NavigationPageLayout user={authUser}>
      <SectionLayout>
        <UserProfile profile={profile} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
