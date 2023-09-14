import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

// TODO Add expiration
export const NewListingSliderExpirationContainer: FunctionComponent = () => {
  const t = useTranslations('listing.new.bottomSlider')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-4')}>
      <div className={clsx('flex', 'flex-col', 'gap-2')}>
        <span className={clsx('prose-label-lg', 'text-white')}>{t('expirationTitle')}</span>
      </div>
      <div className={clsx('rounded-lg', 'border-white/[0.05]', 'px-2.5', 'py-0.5', 'border', 'w-max')}>
        <span className={clsx('prose-label-sm-semi', 'text-white')}>{t('expirationValue')}</span>
      </div>
    </div>
  )
}
