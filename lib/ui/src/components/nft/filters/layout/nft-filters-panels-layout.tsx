import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export const NftFiltersPanelsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={classes('flex', 'flex-col', 'gap-4')}>{children}</div>
}
