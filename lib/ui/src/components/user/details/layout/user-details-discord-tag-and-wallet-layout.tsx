import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const UserDetailsDiscordTagAndWalletLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <div className={clsx('flex', 'flex-col', 'gap-2.5', 'items-start')}>{children}</div>
)
