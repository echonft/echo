import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const TradeDetailsStateLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'justify-center', 'items-center', 'gap-20')}>{children}</div>
}
