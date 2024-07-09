import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { getUserProfile } from '@echo/frontend/lib/helpers/user/get-user-profile'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import type { WithUsername } from '@echo/model/types/with-username'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { UserProfile } from '@echo/ui/components/user/profile/user-profile'
import { notFound } from 'next/navigation'
import { always, isNil, otherwise, pipe } from 'ramda'
import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<PropsWithUser<NextParams<WithUsername>>>

async function render({ params: { username }, user: authUser, children }: Props) {
  const user = await pipe(getUserByUsername, otherwise(pipe(captureAndLogError, always(undefined))))(username)
  if (isNil(user)) {
    notFound()
  }
  const profile = await pipe(getUserProfile, otherwise(pipe(captureAndLogError, always(undefined))))(user)
  if (isNil(profile)) {
    notFound()
  }
  return (
    <NavigationPageLayout user={authUser}>
      <SectionLayout>
        <UserProfile profile={profile} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default withUser(render)
