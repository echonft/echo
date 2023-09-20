import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const NewReceiverItemsEmptyContainer: FunctionComponent = () => {
  const t = useTranslations('items.new')

  return (
    <div className={clsx('flex', 'flex-col', 'items-center', 'grow')}>
      <span className={clsx('text-white/10', 'prose-display-sm')}>{t('noItemsTitle')}</span>
    </div>
  )
}
