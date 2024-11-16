import { CalloutManager } from '@echo/ui/components/base/callout/callout-manager'
import { Header } from '@echo/ui/components/base/header/header'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import type { PropsWithChildren } from 'react'

export default function render({ children }: PropsWithChildren) {
  return (
    <PageLayout>
      <Header />
      <MainSectionLayout>
        {children}
        <CalloutManager />
      </MainSectionLayout>
    </PageLayout>
  )
}
