import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const LoginTitle: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <span className={classes('prose-display-lg-bold', 'text-white', 'text-center')}>{children}</span>
}
