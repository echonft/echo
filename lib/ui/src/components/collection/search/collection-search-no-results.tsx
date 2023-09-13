import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const CollectionSearchNoResults: FunctionComponent = () => {
  const t = useTranslations('listing.new.bottomSlider')

  return (
    <div className={clsx('rounded-lg', 'p-2', 'flex', 'flex-row', 'h-[4.75rem]', 'items-center', 'justify-center')}>
      <span className={clsx('prose-header-sm-semi', 'text-white')}>{t('emptySearch')}</span>
    </div>
  )
}
