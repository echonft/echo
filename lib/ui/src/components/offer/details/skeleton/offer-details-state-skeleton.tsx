import { OfferDetailsStateDetailsLayout } from '@echo/ui/components/offer/details/layout/offer-details-state-details-layout'
import { OfferDetailsStateLayout } from '@echo/ui/components/offer/details/layout/offer-details-state-layout'
import { OfferDetailsStateSeparator } from '@echo/ui/components/offer/details/offer-details-state-separator'
import { Alignment } from '@echo/ui/constants/alignments'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const OfferDetailsStateSkeleton: FunctionComponent = () => {
  return (
    <OfferDetailsStateLayout>
      <OfferDetailsStateDetailsLayout alignment={Alignment.Right}>
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
      </OfferDetailsStateDetailsLayout>
      <OfferDetailsStateSeparator locked={false} />
      <OfferDetailsStateDetailsLayout alignment={Alignment.Left}>
        <div className={clsx('loading-div')}>
          <h1 className={clsx('text-center', 'prose-header-lg-semi', 'invisible')}>{'Pending'}</h1>
        </div>
      </OfferDetailsStateDetailsLayout>
    </OfferDetailsStateLayout>
  )
}
