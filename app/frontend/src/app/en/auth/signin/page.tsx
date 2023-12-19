import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { LoginFlow } from '@echo/ui/components/auth/login-flow'
import { NavigationPageLayout } from '@echo/ui/components/layout/navigation/navigation-page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { getServerSession } from 'next-auth/next'
import { type FunctionComponent } from 'react'

interface Props {
  searchParams: {
    callbackUrl?: string
  }
}

const SigninPage: FunctionComponent<Props> = async ({ searchParams }) => {
  const session = await getServerSession(authOptions)
  return (
    <NavigationPageLayout user={session?.user}>
      <SectionLayout>
        <LoginFlow callbackUrl={searchParams.callbackUrl} user={session?.user} />
      </SectionLayout>
    </NavigationPageLayout>
  )
}

export default SigninPage
