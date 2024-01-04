import { linkProvider } from '@echo/api/services/routing/link-provider'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { LoginFlow } from '@echo/ui/components/auth/login-flow'
import { PageLayout } from '@echo/ui/components/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { redirect } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  searchParams: {
    callbackUrl?: string
  }
}

const SigninPage: FunctionComponent<Props> = async ({ searchParams }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  if (!isNil(user)) {
    redirect(searchParams.callbackUrl ?? linkProvider.base.home.getUrl())
  }
  return (
    <PageLayout headerProps={{ logoOnly: true }}>
      <SectionLayout>
        <LoginFlow callbackUrl={searchParams.callbackUrl} user={user} />
      </SectionLayout>
    </PageLayout>
  )
}

export default SigninPage
