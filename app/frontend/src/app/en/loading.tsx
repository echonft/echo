import { LayoutLoading } from '@echo/ui/components/layout/layout-loading'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const MainLoading: FunctionComponent = () => {
  unstable_setRequestLocale('en')
  return <LayoutLoading />
}

export default MainLoading
