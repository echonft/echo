import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const CollectionProfileTitleLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={classes('flex', 'flex-row', 'items-center', 'gap-2.5', 'w-max', 'h-max')}>{children}</div>
}
