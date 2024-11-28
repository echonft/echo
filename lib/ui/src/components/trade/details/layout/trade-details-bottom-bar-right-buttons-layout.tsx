import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const TradeDetailsBottomBarRightButtonsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'h-max', 'grow', 'basis-0', 'justify-end', 'px-8', 'gap-4')}>
      {children}
    </div>
  )
}
