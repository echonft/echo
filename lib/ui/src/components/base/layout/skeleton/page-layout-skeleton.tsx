import { HeaderSkeleton } from '@echo/ui/components/base/header/skeleton/header-skeleton'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const PageLayoutSkeleton: FunctionComponent = () => {
  return (
    <div className={clsx('h-screen', 'w-full')}>
      <HeaderSkeleton />
      <div className={clsx('h-full', 'w-full', 'bg-dark-500', 'animate-pulse')} />
    </div>
  )
}
