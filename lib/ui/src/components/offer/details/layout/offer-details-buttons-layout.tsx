import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const OfferDetailsButtonsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={classes('flex', 'flex-row', 'gap-8', 'justify-center', 'items-center', 'pb-5')}>{children}</div>
  )
}
