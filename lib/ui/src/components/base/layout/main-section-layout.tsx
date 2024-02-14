import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const MainSectionLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <main className={classes('w-full', 'pb-14', 'relative', 'overflow-hidden')}>{children}</main>
}
