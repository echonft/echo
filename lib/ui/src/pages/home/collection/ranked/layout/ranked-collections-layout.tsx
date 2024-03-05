import { CollectionListHeader } from '@echo/ui/components/collection/row/collection-list-header'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const RankedCollectionsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx('w-full', 'h-max')}>
      <CollectionListHeader />
      <div className={clsx('flex', 'flex-col', 'gap-5', 'self-stretch', 'w-full', 'h-max')}>{children}</div>
    </div>
  )
}
