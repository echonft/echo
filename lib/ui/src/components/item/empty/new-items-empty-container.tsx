import { Disclosure } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  onAddMore?: () => unknown
}

export const NewItemsEmptyContainer: FunctionComponent<Props> = ({ onAddMore }) => {
  const t = useTranslations('items.new')

  return (
    <div className={clsx('flex', 'flex-col', 'gap-2', 'pt-8', 'items-center', 'grow')}>
      <span className={clsx('text-white/10', 'prose-display-sm')}>{t('noItemsTitle')}</span>
      <Disclosure.Button as={'button'} onClick={onAddMore}>
        <span className={clsx('text-white', 'prose-header-sm-semi', 'underline')}>{t('noItemsBtn')}</span>
      </Disclosure.Button>
    </div>
  )
}
