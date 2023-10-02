import { authOptions } from '@constants/auth-options'
import { NotFoundPage } from '@echo/ui/components/layout/not-found-page'
import { PageLayout } from '@echo/ui/components/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { getServerSession } from 'next-auth/next'
import type { FunctionComponent } from 'react'

const NotFound: FunctionComponent = async () => {
  const session = await getServerSession(authOptions)

  return (
    <PageLayout user={session?.user}>
      <SectionLayout>
        <NotFoundPage />
      </SectionLayout>
    </PageLayout>
  )
}

export default NotFound
