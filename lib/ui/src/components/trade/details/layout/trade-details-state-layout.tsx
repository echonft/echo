import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const TradeDetailsStateLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx('relative', 'flex', 'justify-center', 'items-center', 'gap-20', 'w-full', 'h-32')}>
      {children}
    </div>
  )
}
