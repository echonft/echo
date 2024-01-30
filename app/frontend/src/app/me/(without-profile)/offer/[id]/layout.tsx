import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextLayoutParams } from '@echo/frontend/lib/types/next-layout-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { DetailsPaddedContainer } from '@echo/ui/components/base/layout/details-padded-container'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

function render({ user, children }: NextUserParams<NextLayoutParams>) {
  return (
    <NavigationPageLayout user={user}>
      <SectionLayout>
        <DetailsPaddedContainer>{children}</DetailsPaddedContainer>
      </SectionLayout>
    </NavigationPageLayout>
  )
}

export default pipe(withLocale<NextUserParams<NextLayoutParams>, ReactElement>, withUser)(render)
