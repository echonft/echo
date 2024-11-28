import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { CreatedOfferExpiredImg } from '@echo/ui/components/offer/created/created-offer-expired-img'
import { OfferCreationLayout } from '@echo/ui/components/offer/created/layout/offer-creation-layout'
import { OfferCreationSubLayout } from '@echo/ui/components/offer/created/layout/offer-creation-sub-layout'
import { OfferCreationTextLayout } from '@echo/ui/components/offer/created/layout/offer-creation-text-layout'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import type { FunctionComponent } from 'react'

interface Props {
  count: number
}

export const CreatedOfferCancelled: FunctionComponent<Props> = ({ count }) => {
  const t = useTranslations('offer.cancelled')
  const router = useRouter()

  const onClick = () => {
    router.replace(frontendRoutes.base.home.get())
  }
  return (
    <OfferCreationLayout>
      <CreatedOfferExpiredImg />
      <OfferCreationSubLayout>
        <span className={clsx('font-inter', 'text-8xl', 'font-bold', 'text-white', 'px-8')}>{t('title')}</span>
        <OfferCreationTextLayout>
          <span className={clsx('text-white', 'prose-header-sm', 'whitespace-pre-line', 'text-center')}>
            {t.rich('subtitle', {
              red: (text) => <span className={clsx('text-red-500')}>{text}</span>,
              count
            })}
          </span>
          <span className={clsx('text-white/70', 'prose-other-light', 'italic', 'px-12')}>
            {t('description', { count })}
          </span>
        </OfferCreationTextLayout>
        <button className={clsx('btn-gradient', 'group', '!w-full')} onClick={onClick}>
          <span className={clsx('btn-label-gradient')}>{t('homepageBtn')}</span>
        </button>
      </OfferCreationSubLayout>
    </OfferCreationLayout>
  )
}
