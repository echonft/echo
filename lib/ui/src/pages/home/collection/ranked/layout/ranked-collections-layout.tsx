import { CollectionListHeader } from '@echo/ui/components/collection/row/collection-list-header'
import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const RankedCollectionsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes('w-full', 'h-max')}>
      <CollectionListHeader />
      <div className={classes('flex', 'flex-col', 'gap-5', 'self-stretch', 'w-full', 'h-max')}>{children}</div>
    </div>
  )
}
