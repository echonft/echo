import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const OfferDetailsItemsButtonsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={classes('flex', 'flex-col', 'gap-20')}>{children}</div>
}
