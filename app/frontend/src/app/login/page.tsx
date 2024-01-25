import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextSearchParams } from '@echo/frontend/lib/types/next-search-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { LoginLayout } from '@echo/ui/components/auth/layout/login-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<
  NextSearchParams<{
    callbackUrl?: string
  }>
>
function render({ searchParams: { callbackUrl }, user }: Params) {
  return (
    <PageLayout headerVariants={{ logoOnly: true }}>
      <SectionLayout>
        <LoginLayout callbackUrl={callbackUrl} user={user} />
      </SectionLayout>
    </PageLayout>
  )
}

export default pipe(withLocale<Params, ReactElement>, withUser)(render)
