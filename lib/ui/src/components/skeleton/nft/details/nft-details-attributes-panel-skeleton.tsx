import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export const NftDetailsAttributesPanelSkeleton: FunctionComponent = () => {
  const t = useTranslations('nft.details.attributes')

  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'h-max',
        'min-h-[24.575rem]',
        'rounded-2xl',
        'bg-white/[0.09]',
        'py-5',
        'animate-pulse'
      )}
    >
      <p
        className={clsx(
          'px-7',
          'pb-5',
          'rounded-t-2xl',
          'border-b-2',
          'border-solid',
          'border-white/[0.09]',
          'prose-header-sm-semi',
          'text-white/50'
        )}
      >
        {t('title')}
      </p>
    </div>
  )
}
