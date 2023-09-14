import { NftDetailsTokenDetailsPanelRowSkeleton } from '@echo/ui/components/nft/details/skeleton/nft-details-token-details-panel-row-skeleton'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const NftDetailsTokenDetailsPanelSkeleton: FunctionComponent = () => {
  const t = useTranslations()
  return (
    <div
      className={clsx('flex', 'flex-col', 'flex-none', 'w-[33rem]', 'rounded-2xl', 'bg-white/[0.09]', 'h-[12.875rem]')}
    >
      <h1
        className={clsx(
          'prose-header-sm-semi',
          'text-white/50',
          'p-5',
          'rounded-t-2xl',
          'border-b-2',
          'border-solid',
          'border-white/[0.09]'
        )}
      >
        {t('nft.details.tokenDetails.title')}
      </h1>
      <div className={clsx('flex', 'flex-col', 'w-full', 'rounded-b-2xl', 'gap-5', 'p-5')}>
        <NftDetailsTokenDetailsPanelRowSkeleton name={t('nft.details.tokenDetails.tokenId')} value={'9999'} />
        <NftDetailsTokenDetailsPanelRowSkeleton name={t('nft.details.tokenDetails.blockchain')} value={'Ethereum'} />
        <NftDetailsTokenDetailsPanelRowSkeleton name={t('nft.details.tokenDetails.tokenType')} value={'ERC-721'} />
      </div>
    </div>
  )
}
