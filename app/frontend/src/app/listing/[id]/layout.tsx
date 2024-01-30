import { linkProvider } from '@echo/api/routing/link-provider'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextLayoutParams } from '@echo/frontend/lib/types/next-layout-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { BackButtonLayout } from '@echo/ui/components/base/layout/back-button-layout'
import { DetailsPaddedContainer } from '@echo/ui/components/base/layout/details-padded-container'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { NavigationPageLayout } from '@echo/ui/components/base/navigation/navigation-page-layout'
import { getTranslations } from 'next-intl/server'
import { pipe } from 'ramda'
import type { ReactElement } from 'react'

async function render({ user, children }: NextUserParams<NextLayoutParams>) {
  const t = await getTranslations({ namespace: 'listing.details' })

  return (
    <NavigationPageLayout user={user}>
      <SectionLayout>
        <DetailsPaddedContainer>
          <BackButtonLayout title={t('backBtn.label')} path={linkProvider.profile.default.get()}>
            {children}
          </BackButtonLayout>
        </DetailsPaddedContainer>
      </SectionLayout>
    </NavigationPageLayout>
  )
}

export default pipe(withLocale<NextUserParams<NextLayoutParams>, Promise<ReactElement>>, withUser)(render)
