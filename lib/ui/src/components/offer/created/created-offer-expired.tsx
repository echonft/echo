import { linkProvider } from '@echo/api/routing/link-provider'
import { OfferCreationLayout } from '@echo/ui/components/base/offer-creation/offer-creation-layout'
import { OfferCreationSubLayout } from '@echo/ui/components/base/offer-creation/offer-creation-sub-layout'
import { OfferCreationTextLayout } from '@echo/ui/components/base/offer-creation/offer-creation-text-layout'
import { OfferExpiredIconSvg } from '@echo/ui/components/base/svg/offer-expired-icon-svg'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  count: number
}

export const CreatedOfferExpired: FunctionComponent<Props> = ({ count }) => {
  const t = useTranslations('offer.expired')
  const router = useRouter()

  const onClick = () => {
    router.replace(linkProvider.base.home.get())
  }
  return (
    <OfferCreationLayout>
      <span>
        <OfferExpiredIconSvg />
      </span>
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
        <button className={clsx('btn-gradient', 'h-max', 'w-full', 'py-2.5', 'group')} onClick={onClick}>
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('homepageBtn')}</span>
        </button>
      </OfferCreationSubLayout>
    </OfferCreationLayout>
  )
}
