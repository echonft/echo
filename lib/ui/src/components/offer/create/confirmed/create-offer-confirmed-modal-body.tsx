'use client'
import { linkProvider } from '@echo/api/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { ConfirmationIconSvg } from '@echo/ui/components/base/svg/confirmation-icon-svg'
import type { CreateOfferConfirmedModalProps } from '@echo/ui/components/offer/create/confirmed/create-offer-confirmed-modal'
import { classes } from '@echo/ui/helpers/classes'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

export const CreateOfferConfirmedModalBody: FunctionComponent<Omit<CreateOfferConfirmedModalProps, 'open'>> = ({
  offer,
  onClose
}) => {
  const t = useTranslations('offer.create.confirmedModal')
  if (isNil(offer)) {
    return null
  }
  return (
    <div className={classes('flex', 'flex-col', 'gap-6')}>
      <span className={classes('text-white/50', 'text-center', 'prose-header-xs')}>{t('subtitle')}</span>
      <div className={classes('flex', 'items-center', 'justify-center')}>
        <ConfirmationIconSvg />
      </div>
      <div className={classes('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
        <InternalLink path={linkProvider.offer.details.get({ offerId: offer.id })}>
          <button className={classes('btn-action', 'btn-size-alt', 'group')}>
            <span className={classes('prose-label-lg', 'btn-label-action')}>{t('viewBtn')}</span>
          </button>
        </InternalLink>
        <button className={classes('btn-gradient', 'btn-size-alt', 'group')} onClick={onClose}>
          <span className={classes('prose-label-lg', 'btn-label-gradient')}>{t('closeBtn')}</span>
        </button>
      </div>
    </div>
  )
}
