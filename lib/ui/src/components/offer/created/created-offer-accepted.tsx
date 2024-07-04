import { OfferCreationSubLayout } from '@echo/ui/components/offer/created/layout/offer-creation-sub-layout'
import { OfferCreationSuccessLayout } from '@echo/ui/components/offer/created/layout/offer-creation-success-layout'
import { OfferCreationTextLayout } from '@echo/ui/components/offer/created/layout/offer-creation-text-layout'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import type { FunctionComponent } from 'react'

interface Props {
  count: number
}

export const CreatedOfferAccepted: FunctionComponent<Props> = ({ count }) => {
  const t = useTranslations('offer.accepted')
  const router = useRouter()

  const onClick = () => {
    // FIXME kludge we can assume the user is already on the offer details.
    // Need to create new routes for this
    router.refresh()
  }
  return (
    <OfferCreationSuccessLayout>
      <OfferCreationSubLayout>
        <span className={clsx('font-inter', 'text-8xl', 'font-bold', 'text-white', 'px-8')}>{t('title')}</span>
        <OfferCreationTextLayout>
          <span className={clsx('text-white', 'prose-header-sm')}>
            {t.rich('subtitle', {
              yellow: (text) => <span className={clsx('text-yellow-500')}>{text}</span>
            })}
          </span>
          <span
            className={clsx(
              'text-white/70',
              'prose-other-light',
              'italic',
              'px-12',
              'w-max',
              'whitespace-pre-line',
              'text-center'
            )}
          >
            {t('description', { count })}
          </span>
        </OfferCreationTextLayout>
        <button className={clsx('btn-gradient', 'h-max', 'w-full', 'py-2.5', 'group')} onClick={onClick}>
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('offerBtn')}</span>
        </button>
      </OfferCreationSubLayout>
    </OfferCreationSuccessLayout>
  )
}
