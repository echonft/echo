import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const NewOfferBanner: FunctionComponent = () => {
  const t = useTranslations('offer.new.banner')
  const { openModal, hasNewOfferPending } = useNewOfferStore()
  return (
    <ShowIf condition={hasNewOfferPending()}>
      <div
        className={clsx(
          'flex',
          'flex-row',
          'items-center',
          'justify-between',
          'px-20',
          'py-4',
          'w-full',
          'bg-green-300'
        )}
      >
        <span className={clsx('prose-label-md', 'text-dark-500')}>{t('title')}</span>
        <button className={clsx('group')} onClick={openModal}>
          <span
            className={clsx(
              'prose-label-md',
              'text-dark-500',
              'underline',
              'group-active:text-white',
              'group-enabled:group-hover:text-white'
            )}
          >
            {t('btn.label')}
          </span>
        </button>
      </div>
    </ShowIf>
  )
}
