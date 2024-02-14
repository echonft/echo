import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const HomeLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={classes('min-h-full', 'w-full', 'pt-[4.375rem]')}>{children}</div>
}
