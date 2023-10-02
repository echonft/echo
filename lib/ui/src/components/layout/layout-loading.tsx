import { HeaderSkeleton } from '@echo/ui/components/layout/header/skeleton/header-skeleton'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const LayoutLoading: FunctionComponent = () => {
  return (
    <div className={clsx('h-screen', 'w-full')}>
      <HeaderSkeleton />
      <div className={clsx('h-full', 'w-full', 'bg-dark-500', 'animate-pulse')} />
    </div>
  )
}
