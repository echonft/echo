import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const CreateTradeExpirationLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <div className={clsx('flex', 'flex-col', 'gap-12', 'items-center')}>{children}</div>
)
