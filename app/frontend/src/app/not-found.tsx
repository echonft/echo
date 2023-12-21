import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import { NotFoundPage } from '@echo/ui/components/layout/not-found-page'
import { PageLayout } from '@echo/ui/components/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { type FunctionComponent } from 'react'

const NotFound: FunctionComponent = async () => {
  const user = await getAuthUser()
  return (
    <PageLayout user={user}>
      <SectionLayout>
        <NotFoundPage />
      </SectionLayout>
    </PageLayout>
  )
}

export default NotFound
