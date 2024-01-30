'use client'
import { linkProvider } from '@echo/api/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { ConfirmationIconSvg } from '@echo/ui/components/base/svg/confirmation-icon-svg'
import type { CreateOfferConfirmedModalProps } from '@echo/ui/components/offer/create/confirmed/create-offer-confirmed-modal'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

export const CreateOfferConfirmedModalBody: FunctionComponent<Omit<CreateOfferConfirmedModalProps, 'open'>> = ({
  offer,
  onClose
}) => {
  const t = useTranslations('offer.new.confirmedModal')
  if (isNil(offer)) {
    return null
  }
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <span className={clsx('text-white/50', 'text-center', 'prose-header-xs')}>{t('subtitle')}</span>
      <div className={clsx('flex', 'items-center', 'justify-center')}>
        <ConfirmationIconSvg />
      </div>
      <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
        <InternalLink path={linkProvider.offer.details.get({ offerId: offer.id })}>
          <button className={clsx('btn-action', 'btn-size-alt', 'group')}>
            <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('viewBtn')}</span>
          </button>
        </InternalLink>
        <button className={clsx('btn-gradient', 'btn-size-alt', 'group')} onClick={onClose}>
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('closeBtn')}</span>
        </button>
      </div>
    </div>
  )
}
