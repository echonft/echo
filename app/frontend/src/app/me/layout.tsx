import { linkProvider } from '@echo/api/routing/link-provider'
import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { captureAndLogError } from '@echo/frontend/lib/helpers/capture-and-log-error'
import { getUserProfile } from '@echo/frontend/lib/helpers/user/get-user-profile'
import type { PropsWithAuthUser } from '@echo/frontend/lib/types/props-with-auth-user'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { AuthUserProfile } from '@echo/ui/components/user/profile/auth-user-profile'
import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'
import { redirect } from 'next/navigation'
import { always, isNil, otherwise, pipe } from 'ramda'

async function render({ user, children }: PropsWithAuthUser<WithChildrenProps>) {
  const profile = await pipe(getUserProfile, otherwise(pipe(captureAndLogError, always(undefined))))(user)
  if (isNil(profile)) {
    redirect(linkProvider.base.home.get())
  }
  return (
    <NavigationPageLayout user={user}>
      <SectionLayout>
        <AuthUserProfile profile={profile} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default withLoggedInUser(render)
