import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const TradeDetailsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-col', 'w-full', 'h-max')}>{children}</div>
}
