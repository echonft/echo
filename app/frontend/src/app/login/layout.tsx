import { LoginLayout } from '@echo/ui/components/base/auth/layout/login-layout'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { HeaderStyle } from '@echo/ui/constants/header-style'
import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'
import type { PropsWithChildren } from 'react'

export default function render({ children }: PropsWithChildren) {
  return (
    <PageLayout background={PageLayoutBackground.Home}>
      <Header style={HeaderStyle.Plain} />
      <MainSectionLayout>
        <LoginLayout>{children}</LoginLayout>
      </MainSectionLayout>
    </PageLayout>
  )
}
