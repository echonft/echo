import { authOptions } from '@constants/auth-options'
import { PageLayout } from '@echo/ui/components/layout/page-layout'
import { SectionLayout } from '@echo/ui/components/layout/section-layout'
import { getServerSession } from 'next-auth/next'
import { FunctionComponent, PropsWithChildren } from 'react'

const OfferLayout: FunctionComponent<PropsWithChildren> = async ({ children }) => {
  const session = await getServerSession(authOptions)

  return (
    <PageLayout user={session?.user}>
      <SectionLayout>{children}</SectionLayout>
    </PageLayout>
  )
}

export default OfferLayout
