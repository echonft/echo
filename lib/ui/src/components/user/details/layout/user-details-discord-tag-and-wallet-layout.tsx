import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const UserDetailsDiscordTagAndWalletLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <div className={classes('flex', 'flex-col', 'gap-2.5', 'items-start')}>{children}</div>
)
