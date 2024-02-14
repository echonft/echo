import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  className?: string
}

export const PaddedContainer: FunctionComponent<PropsWithChildren<Props>> = ({ className, children }) => {
  return <div className={classes('w-full', 'px-6', 'lg:px-12', className)}>{children}</div>
}
