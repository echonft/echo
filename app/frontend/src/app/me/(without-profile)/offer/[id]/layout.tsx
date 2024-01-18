import { linkProvider } from '@echo/api/services/routing/link-provider'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { BackButtonLayout } from '@echo/ui/components/layout/back-button-layout'
import { DetailsPaddedContainer } from '@echo/ui/components/layout/details-padded-container'
import { NavigationPageLayout } from '@echo/ui/components/layout/navigation/navigation-page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent, type PropsWithChildren } from 'react'

const ProfileLayout: FunctionComponent<PropsWithChildren> = async ({ children }) => {
  unstable_setRequestLocale('en')
  const t = await getTranslations({ namespace: 'offer.details' })
  const user = await getAuthUser()
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

export default ProfileLayout
