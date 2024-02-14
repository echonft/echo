import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const ListingDetailsItemsContainerLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={classes('pb-16')}>{children}</div>
}
