import { AddIconSvg } from '../base/svg/add-icon-svg'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface NftThumbnailOfferAddMoreProps {
  onClick?: () => void
}

export const NftThumbnailOfferAddMore: FunctionComponent<NftThumbnailOfferAddMoreProps> = ({ onClick }) => {
  const t = useTranslations('offer.bottomSlider')
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'rounded-2xl',
        'w-32',
        'gap-2',
        'border',
        'border-dashed',
        'border-white/30',
        'justify-center',
        'items-center',
        'cursor-pointer'
      )}
      onClick={onClick}
    >
      <span className={clsx('bg-yellow-500', 'rounded-lg', 'p-2')}>
        <AddIconSvg />
      </span>
      <span className={clsx('prose-label-sm', 'text-white')}>{t('addMore')}</span>
    </div>
  )
}
