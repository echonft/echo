import { withLoggedInUser } from '@echo/frontend/lib/decorators/with-logged-in-user'
import { getUserProfile } from '@echo/frontend/lib/helpers/user/get-user-profile'
import type { PropsWithAuthUser } from '@echo/frontend/lib/types/props-with-auth-user'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { AuthUserProfile } from '@echo/ui/components/user/profile/auth-user-profile'
import type { WithChildrenProps } from '@echo/ui/types/props/with-children-props'

async function render({ user, children }: PropsWithAuthUser<WithChildrenProps>) {
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

export default withLoggedInUser(render)
