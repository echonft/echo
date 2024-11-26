import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const TradeDetailsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx('w-full', 'h-max')}>
      <div className={clsx('flex', 'flex-col', 'gap-24')}>{children}</div>
    </div>
  )
}
