'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Listing } from '@echo/model/types/listing'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { ListingDetailsModalButtonsContainer } from '@echo/ui/components/listing/details/modal/listing-details-modal-buttons-container'
import { ListingDetailsModalDetailsContainer } from '@echo/ui/components/listing/details/modal/listing-details-modal-details-container'
import { ListingOfferUserDetailsRounded } from '@echo/ui/components/user/listing-offer/listing-offer-user-details-rounded'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  open: boolean
  listing: Listing | undefined
  hasOffers?: boolean
  user: AuthUser | undefined
  onClose?: VoidFunction
  onCancel?: (listing: Listing) => unknown
  onFill?: VoidFunction
  onViewOffers?: VoidFunction
}

export const ListingDetailsModal: FunctionComponent<Props> = ({
  open,
  listing,
  hasOffers,
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

  const isCreator = listing?.creator.username === user.username

  return (
    <Modal open={open} title={t('title')} backButtonLabel={t('backBtn')} onBack={onClose} onClose={onClose}>
      <HideIfNil
        checks={listing}
        render={(listing) => (
          <div className={clsx('flex', 'flex-col', 'gap-12')}>
            <ShowIf condition={!isCreator}>
              <ListingOfferUserDetailsRounded user={listing.creator} />
            </ShowIf>
            <ListingDetailsModalDetailsContainer items={listing.items} targets={listing.targets} />
            <ListingDetailsModalButtonsContainer
              listing={listing}
              hasOffers={hasOffers}
              isCreator={isCreator}
              onCancel={onCancel}
              onFill={onFill}
              onViewOffers={onViewOffers}
            />
          </div>
        )}
      />
    </Modal>
  )
}
