import { TradeCardLayout } from '@echo/ui/components/trade/card/layout/trade-card-layout'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export const TradeCardStackLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className={clsx('relative')}>
      <TradeCardLayout>{children}</TradeCardLayout>
      <TradeCardLayout
        className={clsx('absolute', '-top-1', '-left-1', '-rotate-6', '-z-10', 'border-white/10', 'border')}
      />
    </div>
  )
}
