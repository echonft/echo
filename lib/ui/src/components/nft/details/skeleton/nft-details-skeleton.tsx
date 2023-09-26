import { PaddedContainer } from '@echo/ui/components/layout/padded-container'
import { NftDetailsAttributesPanelSkeleton } from '@echo/ui/components/nft/details/skeleton/nft-details-attributes-panel-skeleton'
import { NftDetailsHeaderSkeleton } from '@echo/ui/components/nft/details/skeleton/nft-details-header-skeleton'
import { NftDetailsListingsPanelSkeleton } from '@echo/ui/components/nft/details/skeleton/nft-details-listings-panel-skeleton'
import { NftDetailsTokenDetailsPanelSkeleton } from '@echo/ui/components/nft/details/skeleton/nft-details-token-details-panel-skeleton'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const NftDetailsSkeleton: FunctionComponent = () => {
  const t = useTranslations('nft.details')
  return (
    <PaddedContainer>
      <div className={clsx('flex', 'flex-row', 'gap-12')}>
        <div className={clsx('flex', 'flex-col', 'flex-none', 'gap-10')}>
          <div className={clsx('w-[33rem]', 'h-[33rem]', 'rounded-2xl', 'bg-white/[0.08]', 'animate-pulse')} />
          <NftDetailsTokenDetailsPanelSkeleton />
        </div>
        <div className={clsx('flex', 'flex-col', 'flex-grow', 'gap-10')}>
          <NftDetailsHeaderSkeleton />
          <div className={clsx('flex', 'flex-row', 'flex-grow', 'gap-12', 'self-stretch')}>
            <button disabled className={clsx('btn-primary', 'group', 'py-[0.88rem]', 'px-10')}>
              <span className={clsx('prose-label-lg-semi', 'btn-label-primary')}>{t('makeOfferBtn')}</span>
            </button>
            <NftDetailsListingsPanelSkeleton />
          </div>
          <NftDetailsAttributesPanelSkeleton />
        </div>
      </div>
    </PaddedContainer>
  )
}
