import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const ProfileLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={classes('w-full', 'h-max')}>{children}</div>
}
