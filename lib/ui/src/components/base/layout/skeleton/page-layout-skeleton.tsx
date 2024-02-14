import { HeaderSkeleton } from '@echo/ui/components/base/header/skeleton/header-skeleton'
import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent } from 'react'

export const PageLayoutSkeleton: FunctionComponent = () => {
  return (
    <div className={classes('h-screen', 'w-full')}>
      <HeaderSkeleton />
      <div className={classes('h-full', 'w-full', 'bg-dark-500', 'animate-pulse')} />
    </div>
  )
}
