import { pathProvider } from '@echo/api/routing/path-provider'
import type { Offer } from '@echo/model/types/offer'
import { OfferCreationSubLayout } from '@echo/ui/components/offer/created/layout/offer-creation-sub-layout'
import { OfferCreationSuccessLayout } from '@echo/ui/components/offer/created/layout/offer-creation-success-layout'
import { OfferCreationTextLayout } from '@echo/ui/components/offer/created/layout/offer-creation-text-layout'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import type { FunctionComponent } from 'react'

interface Props {
  offer: Offer
}

export const CreatedOfferCreated: FunctionComponent<Props> = ({ offer }) => {
  const t = useTranslations('offer.created')
  const router = useRouter()

  const onClick = () => {
    router.replace(pathProvider.profile.default.get({ offer }))
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
            {t('description', { count: offer.senderItems.length })}
          </span>
        </OfferCreationTextLayout>
        <button className={clsx('btn-gradient', 'h-max', 'w-full', 'py-2.5', 'group')} onClick={onClick}>
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('offerBtn')}</span>
        </button>
      </OfferCreationSubLayout>
    </OfferCreationSuccessLayout>
  )
}
