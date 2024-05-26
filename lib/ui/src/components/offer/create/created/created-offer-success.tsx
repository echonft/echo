import { linkProvider } from '@echo/api/routing/link-provider'
import { OfferCreatedBannerSvg } from '@echo/ui/components/base/svg/offer-created-banner-svg'
import { OfferCreatedRocketSvg } from '@echo/ui/components/base/svg/offer-created-rocket-svg'
import { CreatedOfferLayout } from '@echo/ui/components/offer/create/created/created-offer-layout'
import { CreatedOfferSubLayout } from '@echo/ui/components/offer/create/created/created-offer-sub-layout'
import { CreatedOfferTextLayout } from '@echo/ui/components/offer/create/created/created-offer-text-layout'
import { DIRECTION_LEFT, DIRECTION_RIGHT } from '@echo/ui/constants/direction'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

// FIXME slug should not be optional
interface Props {
  count: number
  slug?: string
}

// FIXME split in 2 components + layout to have CreatedOfferSuccess and SwapSuccess (in swap directory)
export const CreatedOfferSuccess: FunctionComponent<Props> = ({ count, slug }) => {
  const t = useTranslations('offer.create.success')
  const router = useRouter()

  const onClick = () => {
    if (isNil(slug)) {
      router.replace(linkProvider.base.home.get())
    } else {
      router.replace(linkProvider.offer.details.get({ slug: slug }))
    }
  }
  return (
    <CreatedOfferLayout>
      <span className={clsx('absolute', '-top-10', '-left-0')}>
        <OfferCreatedBannerSvg direction={DIRECTION_LEFT} width={500} height={500} />
      </span>
      <span className={clsx('absolute', '-top-10', '-right-0')}>
        <OfferCreatedBannerSvg direction={DIRECTION_RIGHT} width={500} height={500} />
      </span>
      <span>
        <OfferCreatedRocketSvg />
      </span>
      <CreatedOfferSubLayout>
        <span className={clsx('font-inter', 'text-8xl', 'font-bold', 'text-white', 'px-8')}>{t('title')}</span>
        <CreatedOfferTextLayout>
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
        </CreatedOfferTextLayout>
        <button className={clsx('btn-gradient', 'h-max', 'w-full', 'py-2.5', 'group')} onClick={onClick}>
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>
            {t(isNil(slug) ? 'homepageBtn' : 'offerBtn')}
          </span>
        </button>
      </CreatedOfferSubLayout>
    </CreatedOfferLayout>
  )
}
