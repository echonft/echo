import type { Listing } from '@echo/model/types/listing'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { ListingDetailsButtonsLayout } from '@echo/ui/components/listing/details/layout/listing-details-buttons-layout'
import { isListingRoleCreator } from '@echo/ui/helpers/listing/is-listing-role-creator'
import { isListingRoleTarget } from '@echo/ui/helpers/listing/is-listing-role-target'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  listing: ListingWithRole
  isMutating?: boolean
  hasSelectedEnoughNfts?: boolean
  actions?: {
    onCancel?: (listing: Listing) => void
    onFill?: (listing: Listing) => void
    onViewOffers?: VoidFunction
  }
}

export const ListingDetailsButtonsContainer: FunctionComponent<Props> = ({
  listing,
  isMutating = false,
  hasSelectedEnoughNfts = false,
  actions
}) => {
  const t = useTranslations('listing.details')
  // We don't show any buttons if the listing is final
  if (listing.readOnly) {
    return null
  }
  if (isListingRoleCreator(listing)) {
    return (
      <ListingDetailsButtonsLayout>
        <LongPressButton
          id={'listing-details-modal-cancel-button'}
          label={t('cancelBtn.label')}
          message={t('cancelBtn.message')}
          loading={isNil(actions?.onCancel)}
          onFinish={() => actions?.onCancel?.(listing)}
        />
      </ListingDetailsButtonsLayout>
    )
  }
  if (isListingRoleTarget(listing)) {
    return (
      <ListingDetailsButtonsLayout>
        <button
          className={clsx('btn-gradient', 'btn-size-alt', 'group', isMutating && 'animate-pulse')}
          disabled={isMutating || !hasSelectedEnoughNfts}
          onClick={() => actions?.onFill?.(listing)}
        >
          <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('fillBtn.label')}</span>
        </button>
      </ListingDetailsButtonsLayout>
    )
  }
  return null
}
