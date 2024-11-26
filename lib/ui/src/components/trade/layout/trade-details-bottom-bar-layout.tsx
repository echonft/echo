import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const TradeDetailsBottomBarLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'items-center',
        'w-full',
        'h-max',
        'py-5',
        'border-t',
        'border-solid',
        'border-white/10'
      )}
    >
      {children}
    </div>
  )
}
