import { Error404 } from '@echo/ui/components/error/error-404'
import { PageLayout } from '@echo/ui/components/layout/page-layout'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const NotFound: FunctionComponent = () => {
  unstable_setRequestLocale('en')
  return (
    <PageLayout headerVariants={{ logoOnly: true }}>
      <Error404 />
    </PageLayout>
  )
}

export default NotFound
