import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { environment } from '@echo/utils/constants/environment'
import { isDev } from '@echo/utils/constants/is-dev'
import { notFound } from 'next/navigation'
import type { PropsWithChildren } from 'react'

export default function render({ children }: PropsWithChildren) {
  if (!isDev || environment !== 'development') {
    notFound()
  }
  return (
    <PageLayout>
      <SectionLayout>{children}</SectionLayout>
    </PageLayout>
  )
}
