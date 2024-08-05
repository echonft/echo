import { OfferDetailsStateDetailsLayout } from '@echo/ui/components/offer/details/layout/offer-details-state-details-layout'
import { OfferDetailsStateLayout } from '@echo/ui/components/offer/details/layout/offer-details-state-layout'
import { OfferDetailsStateSeparator } from '@echo/ui/components/offer/details/offer-details-state-separator'
import { ALIGNMENT_LEFT, ALIGNMENT_RIGHT } from '@echo/ui/constants/alignments'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export const OfferDetailsStateSkeleton: FunctionComponent = () => {
  return (
    <OfferDetailsStateLayout>
      <OfferDetailsStateDetailsLayout alignment={ALIGNMENT_RIGHT}>
        <div className={clsx('flex', 'flex-col', 'gap-1', 'items-center')}>
          <div className={clsx('h-5', 'w-40', 'rounded-lg', 'bg-white/[0.08]', 'animate-pulse')} />
          <div className={clsx('h-10', 'w-48', 'rounded-lg', 'bg-white/[0.08]', 'animate-pulse')} />
        </div>
      </OfferDetailsStateDetailsLayout>
      <OfferDetailsStateSeparator readOnly={false} />
      <OfferDetailsStateDetailsLayout alignment={ALIGNMENT_LEFT}>
        <div className={clsx('h-10', 'w-48', 'rounded-lg', 'bg-white/[0.08]', 'animate-pulse')} />
      </OfferDetailsStateDetailsLayout>
    </OfferDetailsStateLayout>
  )
}
