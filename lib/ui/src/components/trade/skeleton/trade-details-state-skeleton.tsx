import { TradeDetailsStateDetailsLayout } from '@echo/ui/components/trade/layout/trade-details-state-details-layout'
import { TradeDetailsStateLayout } from '@echo/ui/components/trade/layout/trade-details-state-layout'
import { TradeDetailsStateSeparator } from '@echo/ui/components/trade/trade-details-state-separator'
import { ALIGNMENT_LEFT, ALIGNMENT_RIGHT } from '@echo/ui/constants/alignments'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const TradeDetailsStateSkeleton: FunctionComponent = () => {
  return (
    <TradeDetailsStateLayout>
      <TradeDetailsStateDetailsLayout alignment={ALIGNMENT_RIGHT}>
        <div className={clsx('flex', 'flex-col', 'gap-1', 'items-center')}>
          <div className={clsx('loading-div')}>
            <h2
              className={clsx(
                'text-[0.875rem]',
                'font-semibold',
                'leading-[1.28125rem]',
                'tracking-[0.0175rem]',
                'font-inter',
                'text-center',
                'invisible'
              )}
            >
              {'Expires in'}
            </h2>
          </div>
          <div className={clsx('loading-div')}>
            <h1 className={clsx('text-center', 'prose-header-lg-semi', 'invisible')}>{'10 hours'}</h1>
          </div>
        </div>
      </TradeDetailsStateDetailsLayout>
      <TradeDetailsStateSeparator readOnly={false} />
      <TradeDetailsStateDetailsLayout alignment={ALIGNMENT_LEFT}>
        <div className={clsx('loading-div')}>
          <h1 className={clsx('text-center', 'prose-header-lg-semi', 'invisible')}>{'Pending'}</h1>
        </div>
      </TradeDetailsStateDetailsLayout>
    </TradeDetailsStateLayout>
  )
}
