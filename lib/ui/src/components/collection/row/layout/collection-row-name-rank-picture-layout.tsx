import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const CollectionRowNameRankPictureLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={classes('flex', 'flex-row', 'gap-12', 'items-center', 'h-max', 'w-full')}>{children}</div>
}
