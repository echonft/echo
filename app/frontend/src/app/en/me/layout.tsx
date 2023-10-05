import { authOptions } from '@constants/auth-options'
import { NavigationPageLayout } from '@echo/ui/components/layout/navigation/navigation-page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { ProfileDetailsApiProvided } from '@echo/ui/components/profile/api-provided/profile-details-api-provided'
import { getServerSession } from 'next-auth/next'
import type { FunctionComponent, PropsWithChildren } from 'react'

const ProfileLayout: FunctionComponent<PropsWithChildren> = async ({ children }) => {
  const session = await getServerSession(authOptions)

  return (
    <NavigationPageLayout user={session?.user}>
      <SectionLayout>
        <ProfileDetailsApiProvided user={session?.user} />
      </SectionLayout>
      <SectionLayout>{children}</SectionLayout>
    </NavigationPageLayout>
  )
}

export default ProfileLayout
