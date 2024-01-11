import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { LoginLayout } from '@echo/ui/components/auth/layout/login-layout'
import { PageLayout } from '@echo/ui/components/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

interface Props {
  searchParams: {
    callbackUrl?: string
  }
}

const LoginPage: FunctionComponent<Props> = async ({ searchParams }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
  // if (isNil(searchParams.callbackUrl) && !isNil(user)) {
  //   redirect(linkProvider.base.home.getUrl())
  // }
  return (
    <PageLayout headerVariants={{ logoOnly: true }}>
      <SectionLayout>
        <LoginLayout callbackUrl={searchParams.callbackUrl} user={user} wallets={[]} />
      </SectionLayout>
    </PageLayout>
  )
}

export default LoginPage
