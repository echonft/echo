import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { Environment, environment } from '@echo/utils/constants/environment'
import { NodeEnvironment, nodeEnvironment } from '@echo/utils/constants/node-environment'
import { notFound } from 'next/navigation'
import type { PropsWithChildren } from 'react'

export default function render({ children }: PropsWithChildren) {
  if (nodeEnvironment !== NodeEnvironment.Development && environment !== Environment.Development) {
    notFound()
  }
  return (
    <PageLayout>
      <SectionLayout>{children}</SectionLayout>
    </PageLayout>
  )
}
