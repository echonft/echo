import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const CollectionRowRankPictureLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={classes('flex', 'flex-row', 'gap-7.5', 'items-center', 'h-max')}>{children}</div>
}
