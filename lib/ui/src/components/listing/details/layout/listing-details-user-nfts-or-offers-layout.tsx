import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const ListingDetailsUserNftsOrOffersLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <div className={classes('flex', 'flex-col', 'gap-4')}>{children}</div>
)
