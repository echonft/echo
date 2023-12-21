import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { LoginFlow } from '@echo/ui/components/auth/login-flow'
import { NavigationPageLayout } from '@echo/ui/components/layout/navigation/navigation-page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { type FunctionComponent } from 'react'

interface Props {
  searchParams: {
    callbackUrl?: string
  }
}

const SigninPage: FunctionComponent<Props> = async ({ searchParams }) => {
  const user = await getAuthUser()
  return (
    <NavigationPageLayout user={user}>
      <SectionLayout>
        <LoginFlow callbackUrl={searchParams.callbackUrl} user={user} />
      </SectionLayout>
    </NavigationPageLayout>
  )
}

export default SigninPage
