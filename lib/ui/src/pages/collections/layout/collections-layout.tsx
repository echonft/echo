import { CollectionListHeader } from '@echo/ui/components/collection/row/collection-list-header'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const CollectionsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx('w-full', 'h-max')}>
      <CollectionListHeader />
      {children}
    </div>
  )
}
