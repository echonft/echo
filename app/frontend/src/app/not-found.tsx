import { PageLayout } from '@echo/ui/components/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { NotFoundPage } from '@echo/ui/components/page/not-found-page'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const NotFound: FunctionComponent = () => {
  unstable_setRequestLocale('en')
  return (
    <PageLayout headerProps={{ logoOnly: true }}>
      <SectionLayout>
        <NotFoundPage />
      </SectionLayout>
    </PageLayout>
  )
}

export default NotFound
