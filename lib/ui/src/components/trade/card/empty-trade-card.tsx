import { TradeCardLayout } from '@echo/ui/components/trade/card/layout/trade-card-layout'
import clsx from 'clsx'
import { type FunctionComponent } from 'react'

export const EmptyTradeCard: FunctionComponent = () => (
  <TradeCardLayout className={clsx('bg-white/10', 'border', 'border-white', 'border-dashed')} />
)
