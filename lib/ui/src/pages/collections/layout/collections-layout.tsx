import { CollectionListHeader } from '@echo/ui/components/collection/row/collection-list-header'
import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const CollectionsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes('w-full', 'h-max')}>
      <CollectionListHeader />
      {children}
    </div>
  )
}
