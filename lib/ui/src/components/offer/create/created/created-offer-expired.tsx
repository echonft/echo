import { linkProvider } from '@echo/api/routing/link-provider'
import { OfferExpiredIconSvg } from '@echo/ui/components/base/svg/offer-expired-icon-svg'
import { CreatedOfferLayout } from '@echo/ui/components/offer/create/created/created-offer-layout'
import { CreatedOfferSubLayout } from '@echo/ui/components/offer/create/created/created-offer-sub-layout'
import { CreatedOfferTextLayout } from '@echo/ui/components/offer/create/created/created-offer-text-layout'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const CreatedOfferSuccess: FunctionComponent = () => {
  const t = useTranslations('offer.create.expired')
  const router = useRouter()

  const onClick = () => {
    router.replace(linkProvider.base.home.get())
  }
  return (
    <CreatedOfferLayout>
      <span>
        <OfferExpiredIconSvg />
      </span>
      <CreatedOfferSubLayout>
        <span className={clsx('font-inter', 'text-8xl', 'font-bold', 'text-white', 'px-8')}>{t('title')}</span>
        <CreatedOfferTextLayout>
          <span className={clsx('text-white', 'prose-header-sm')}>
            {t.rich('subtitle', {
              red: (text) => <span className={clsx('text-red-500')}>{text}</span>
            })}
          </span>
          <span className={clsx('text-white/70', 'prose-other-light', 'italic', 'px-12')}>{t('description')}</span>
        </CreatedOfferTextLayout>
        <button className={clsx('btn-gradient', 'h-max', 'w-full', 'py-2.5', 'group')} onClick={onClick}>
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('homepageBtn')}</span>
        </button>
      </CreatedOfferSubLayout>
    </CreatedOfferLayout>
  )
}
