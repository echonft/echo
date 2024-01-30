import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextLayoutParams } from '@echo/frontend/lib/types/next-layout-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { PAGE_LAYOUT_BG_HOME } from '@echo/ui/constants/page-layout-background'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextLayoutParams>
function render({ user, children }: Params) {
  return (
    <PageLayout user={user} background={PAGE_LAYOUT_BG_HOME}>
      <SectionLayout>{children}</SectionLayout>
    </PageLayout>
  )
}

export default pipe(withLocale<Params, ReactElement>, withUser)(render)
