import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const TokenSelectorInfo: FunctionComponent = () => {
  const t = useTranslations('trade.tokenSelector')

  return (
    <div className={clsx('flex', 'flex-col', 'gap-1')}>
      <span className={clsx('prose-paragraph-md', 'text-white')}>{t('title')}</span>
      <span className={clsx('prose-paragraph-xs', 'text-white/50')}>{t('subtitle')}</span>
    </div>
  )
}
