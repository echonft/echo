import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const TradeCardsLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className={clsx('flex', 'flex-row', 'items-center', 'justify-center')}>{children}</div>
}
