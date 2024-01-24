import type { Listing } from '@echo/model/types/listing'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  listing: Listing
  // TODO remove and use ListingWithRole
  isCreator: boolean
  hasOffers?: boolean
  actions?: {
    onCancel?: (listing: Listing) => void
    onFill?: VoidFunction
    onViewOffers?: VoidFunction
  }
}

export const ListingDetailsModalButtonsContainer: FunctionComponent<Props> = ({
  listing,
  isCreator,
  hasOffers,
  actions
}) => {
  const t = useTranslations('listing.details.modal')
  // We don't show any buttons if the listing is final
  if (listing.readOnly) {
    return null
  }
  if (isCreator) {
    if (hasOffers) {
      // TODO Should lead to offers, not sure where to go for now
      return (
        <InternalLink path={'/'}>
          <button
            className={clsx('btn-action', 'btn-size-alt', 'group', isNil(actions?.onViewOffers) && 'animate-pulse')}
            onClick={actions?.onViewOffers}
            disabled={isNil(actions?.onViewOffers)}
          >
            <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('viewOffersBtn')}</span>
          </button>
        </InternalLink>
      )
    }
    return (
      <LongPressButton
        id={'listing-details-modal-cancel-button'}
        label={t('cancelBtn.label')}
        message={t('cancelBtn.message')}
        loading={isNil(actions?.onCancel)}
        onFinish={() => actions?.onCancel?.(listing)}
      />
    )
  }
  // TODO Should lead to listing details to fill
  return (
    <InternalLink path={'/'}>
      <button
        className={clsx('btn-gradient', 'btn-size-alt', 'group', isNil(actions?.onFill) && 'animate-pulse')}
        onClick={actions?.onFill}
        disabled={isNil(actions?.onFill)}
      >
        <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('fillBtn')}</span>
      </button>
    </InternalLink>
  )
}
