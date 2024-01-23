'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Listing } from '@echo/model/types/listing'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ListingDetailsModalButtonsContainer } from '@echo/ui/components/listing/details/modal/listing-details-modal-buttons-container'
import { ListingDetailsModalDetailsContainer } from '@echo/ui/components/listing/details/modal/listing-details-modal-details-container'
import { UserDetailsRoundedContainer } from '@echo/ui/components/shared/user-details-rounded-container'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  open: boolean
  listing: Listing
  user: AuthUser | undefined
  onClose?: VoidFunction
  onCancel?: (listing: Listing) => unknown
  onFill?: VoidFunction
  onViewOffers?: VoidFunction
}

export const ListingDetailsModal: FunctionComponent<Props> = ({
  open,
  listing,
  user,
  onClose,
  onCancel,
  onFill,
  onViewOffers
}) => {
  const t = useTranslations('listing.details.modal')

  if (isNil(user)) {
    return null
  }

  const isCreator = listing.creator.username === user.username

  return (
    <Modal open={open} title={t('title')} backButtonLabel={t('backBtn')} onBack={onClose} onClose={onClose}>
      <div className={clsx('flex', 'flex-col', 'gap-12')}>
        {!isCreator && <UserDetailsRoundedContainer user={listing.creator} />}
        <ListingDetailsModalDetailsContainer items={listing.items} targets={listing.targets} />
        <ListingDetailsModalButtonsContainer
          listing={listing}
          isCreator={isCreator}
          onCancel={onCancel}
          onFill={onFill}
          onViewOffers={onViewOffers}
        />
      </div>
    </Modal>
  )
}
