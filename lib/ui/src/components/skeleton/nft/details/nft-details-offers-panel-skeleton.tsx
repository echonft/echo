import { HandIconSvg } from '../../../base/svg/hand-icon-svg'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export const NftDetailsOffersPanelSkeleton: FunctionComponent = () => {
  const t = useTranslations('nft.details.offers')
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'self-stretch',
        'flex-grow',
        'h-max',
        'bg-white/[0.09]',
        'rounded-2xl',
        'py-3',
        'px-7',
        'gap-2',
        'min-h-[10.375rem]',
        'animate-pulse'
      )}
    >
      <div className={clsx('flex', 'flex-row', 'gap-1.5', 'items-center', 'text-white')}>
        <HandIconSvg width={17} />
        <span className={clsx('prose-label-md-semi')}>{t('title')}</span>
      </div>
    </div>
  )
}
