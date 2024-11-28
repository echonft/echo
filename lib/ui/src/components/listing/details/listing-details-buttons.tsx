import type { Listing } from '@echo/model/types/listing'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { ListingDetailsButtonsLayout } from '@echo/ui/components/listing/details/layout/listing-details-buttons-layout'
import { isListingRoleCreator } from '@echo/ui/helpers/listing/is-listing-role-creator'
import { isListingRoleTarget } from '@echo/ui/helpers/listing/is-listing-role-target'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  listing: ListingWithRole
  isMutating?: boolean
  onCancel?: (listing: Listing) => void
  onFill?: VoidFunction
}

export const ListingDetailsButtons: FunctionComponent<Props> = ({ listing, isMutating = false, onCancel, onFill }) => {
  const t = useTranslations('listing.details')
  // We don't show any buttons if the listing is final
  if (listing.locked) {
    return null
  }
  if (isListingRoleCreator(listing)) {
    return (
      <ListingDetailsButtonsLayout>
        <LongPressButton
          id={'listing-details-modal-cancel-button'}
          label={t('cancelBtn.label')}
          message={t('cancelBtn.message')}
          loading={isMutating}
          onFinish={() => onCancel?.(listing)}
        />
      </ListingDetailsButtonsLayout>
    )
  }
  if (isListingRoleTarget(listing)) {
    return (
      <ListingDetailsButtonsLayout>
        <button className={clsx('btn-gradient', 'group')} onClick={onFill}>
          <span className={clsx('btn-label-gradient')}>{t('fillBtn')}</span>
        </button>
      </ListingDetailsButtonsLayout>
    )
  }
  return null
}
