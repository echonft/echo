import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export const NftDetailsTokenDetailsPanelSkeleton: FunctionComponent = () => {
  const t = useTranslations()
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'flex-none',
        'w-[33rem]',
        'rounded-2xl',
        'bg-white/[0.09]',
        'h-[12.875rem]',
        'animate-pulse'
      )}
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
    </div>
  )
}
