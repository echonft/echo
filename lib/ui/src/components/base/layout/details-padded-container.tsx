import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const DetailsPaddedContainer: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={classes('w-full', 'px-16', 'pt-24')}>{children}</div>
}
