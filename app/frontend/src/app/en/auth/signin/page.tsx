import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { AuthPage } from '@echo/ui/components/auth/auth-page'
import { LoginFlow } from '@echo/ui/components/auth/login-flow'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

interface Props {
  searchParams: {
    callbackUrl?: string
  }
}

const SigninPage: FunctionComponent<Props> = async ({ searchParams }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  return (
    <AuthPage>
      <SectionLayout>
        <LoginFlow callbackUrl={searchParams.callbackUrl} user={user} />
      </SectionLayout>
    </AuthPage>
  )
}

export default SigninPage
