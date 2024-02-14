import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const HomeSectionsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={classes('flex', 'flex-col', 'w-full', 'gap-24')}>{children}</div>
}
