import { PaddedContainer } from '../../../layout/padded-container'
import { NftDetailsAttributesPanelSkeleton } from './nft-details-attributes-panel-skeleton'
import { NftDetailsHeaderSkeleton } from './nft-details-header-skeleton'
import { NftDetailsOffersPanelSkeleton } from './nft-details-offers-panel-skeleton'
import { NftDetailsTokenDetailsPanelSkeleton } from './nft-details-token-details-panel'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export const NftDetailsSkeleton: FunctionComponent = () => {
  const t = useTranslations('nft.details')
  return (
    <PaddedContainer>
      <div className={clsx('flex', 'flex-row', 'gap-12')}>
        <div className={clsx('flex', 'flex-col', 'flex-none', 'gap-10')}>
          <div className={clsx('w-[33rem]', 'h-[33rem]', 'rounded-2xl', 'bg-white/[0.09]', 'animate-pulse')} />
          <NftDetailsTokenDetailsPanelSkeleton />
        </div>
        <div className={clsx('flex', 'flex-col', 'flex-grow', 'gap-10')}>
          <NftDetailsHeaderSkeleton />
          <div className={clsx('flex', 'flex-row', 'flex-grow', 'gap-12', 'self-stretch')}>
            <button disabled className={clsx('btn-primary', 'group', 'rounded-lg', 'w-max', 'py-[0.88rem]', 'px-10')}>
              <span className={clsx('prose-label-lg-semi', 'btn-label-primary')}>{t('makeOfferBtn')}</span>
            </button>
            <NftDetailsOffersPanelSkeleton />
          </div>
          <NftDetailsAttributesPanelSkeleton />
        </div>
      </div>
    </PaddedContainer>
  )
}
