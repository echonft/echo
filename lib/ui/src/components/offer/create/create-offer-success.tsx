import { linkProvider } from '@echo/api/routing/link-provider'
import { OfferCreatedBannerSvg } from '@echo/ui/components/base/svg/offer-created-banner-svg'
import { OfferCreatedRocketSvg } from '@echo/ui/components/base/svg/offer-created-rocket-svg'
import { DIRECTION_LEFT, DIRECTION_RIGHT } from '@echo/ui/constants/direction'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  offerSlug?: string
}

export const CreateOfferSuccess: FunctionComponent<Props> = ({ offerSlug }) => {
  const t = useTranslations('offer.create.success')
  const router = useRouter()

  const onClick = () => {
    if (isNil(offerSlug)) {
      router.replace(linkProvider.base.home.get())
    } else {
      router.replace(linkProvider.offer.details.get({ slug: offerSlug }))
    }
  }
  return (
    <div className={clsx('flex', 'flex-col', 'pt-56', 'w-full', 'items-center', 'gap-7')}>
      <span className={clsx('absolute', '-top-10', '-left-0')}>
        <OfferCreatedBannerSvg direction={DIRECTION_LEFT} width={500} height={500} />
      </span>
      <span className={clsx('absolute', '-top-10', '-right-0')}>
        <OfferCreatedBannerSvg direction={DIRECTION_RIGHT} width={500} height={500} />
      </span>
      <span>
        <OfferCreatedRocketSvg />
      </span>
      <div className={clsx('flex', 'flex-col', 'gap-12', 'items-center')}>
        <span className={clsx('font-inter', 'text-8xl', 'font-bold', 'text-white', 'px-8')}>{t('title')}</span>
        <div className={clsx('flex', 'flex-col', 'gap-4', 'px-16', 'items-center')}>
          <span className={clsx('text-white', 'prose-header-sm')}>
            {t.rich('subtitle', {
              yellow: (text) => <span className={clsx('text-yellow-500')}>{text}</span>
            })}
          </span>
          <span className={clsx('text-white/70', 'prose-other-light', 'italic', 'px-12')}>{t('description')}</span>
        </div>
        <button className={clsx('btn-gradient', 'h-max', 'w-full', 'py-2.5', 'group')} onClick={onClick}>
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>
            {t(isNil(offerSlug) ? 'homepageBtn' : 'offerBtn')}
          </span>
        </button>
      </div>
    </div>
  )
}
