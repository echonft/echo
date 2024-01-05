import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { LoginFlow } from '@echo/ui/components/auth/login-flow'
import { PageLayout } from '@echo/ui/components/layout/page-layout'
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
  // TODO
  // if (!isNil(user)) {
  //   redirect(searchParams.callbackUrl ?? linkProvider.base.home.getUrl())
  // }
  return (
    <PageLayout headerVariants={{ logoOnly: true }}>
      <SectionLayout>
        <LoginFlow user={user} callbackUrl={searchParams.callbackUrl} />
      </SectionLayout>
    </PageLayout>
  )
}

export default SigninPage
