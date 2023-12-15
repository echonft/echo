import { linkProvider } from '@echo/api/services/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { Disclosure } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const NewSenderItemsEmptyContainer: FunctionComponent = () => {
  const t = useTranslations('items.new')

  return (
    <div className={clsx('flex', 'flex-col', 'gap-2', 'justify-center', 'items-center', 'grow')}>
      <span className={clsx('text-white/10', 'prose-display-sm')}>{t('noItemsTitle')}</span>
      <InternalLink path={linkProvider.profile.items.get()}>
        <Disclosure.Button className={clsx('outline-none')} as={'button'}>
          <span className={clsx('text-white', 'prose-header-sm-semi', 'underline')}>{t('noItemsBtn')}</span>
        </Disclosure.Button>
      </InternalLink>
    </div>
  )
}
