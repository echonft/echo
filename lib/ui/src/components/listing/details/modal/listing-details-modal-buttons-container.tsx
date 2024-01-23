import type { Listing } from '@echo/model/types/listing'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  listing: Listing
  isCreator: boolean
  hasOffers?: boolean
  onCancel?: (listing: Listing) => void
  onFill?: VoidFunction
  onViewOffers?: VoidFunction
}

export const ListingDetailsModalButtonsContainer: FunctionComponent<Props> = ({
  listing,
  isCreator,
  hasOffers,
  onCancel,
  onFill,
  onViewOffers
}) => {
  const t = useTranslations('listing.details.modal')

  // We don't show any buttons if the listing is final
  if (listing.readOnly) {
    return null
  }

  return (
    <div className={clsx('flex', 'flex-row', 'gap-4.5', 'items-center', 'justify-center')}>
      <ShowIf condition={isCreator && Boolean(hasOffers)}>
        {/* TODO Should lead to offers, not sure where to go for now*/}
        <InternalLink path={'/'}>
          <button
            className={clsx('btn-action', 'btn-size-alt', 'group', isNil(onViewOffers) && 'animate-pulse')}
            onClick={onViewOffers}
            disabled={isNil(onViewOffers)}
          >
            <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('viewOffersBtn')}</span>
          </button>
        </InternalLink>
      </ShowIf>
      <ShowIf condition={!isCreator}>
        <InternalLink path={'/'}>
          {/* TODO Should lead to listing details to fill*/}
          <button
            className={clsx('btn-gradient', 'btn-size-alt', 'group', isNil(onFill) && 'animate-pulse')}
            onClick={onFill}
            disabled={isNil(onFill)}
          >
            <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('fillBtn')}</span>
          </button>
        </InternalLink>
      </ShowIf>
      <ShowIf condition={isCreator}>
        <LongPressButton
          id={'listing-details-modal-cancel-button'}
          label={t('cancelBtn.label')}
          message={t('cancelBtn.message')}
          loading={isNil(onCancel)}
          onFinish={() => onCancel?.(listing)}
        />
        )
      </ShowIf>
    </div>
  )
}
