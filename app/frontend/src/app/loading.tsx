import { PageLayoutSkeleton } from '@echo/ui/components/layout/skeleton/page-layout-skeleton'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const MainLoading: FunctionComponent = () => {
  unstable_setRequestLocale('en')
  return <PageLayoutSkeleton />
}

export default MainLoading
