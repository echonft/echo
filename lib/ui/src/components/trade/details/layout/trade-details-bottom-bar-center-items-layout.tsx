import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const TradeDetailsBottomBarCenterItemsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'h-max', 'w-max', 'flex-none', 'basis-0', 'items-center', 'gap-8')}>
      {children}
    </div>
  )
}
