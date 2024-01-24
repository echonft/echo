'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Listing } from '@echo/model/types/listing'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ListingDetailsModalButtonsContainer } from '@echo/ui/components/listing/details/modal/listing-details-modal-buttons-container'
import { ListingDetailsModalCreator } from '@echo/ui/components/listing/details/modal/listing-details-modal-creator'
import { ListingDetailsModalDetailsContainer } from '@echo/ui/components/listing/details/modal/listing-details-modal-details-container'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil, omit } from 'ramda'
import type { FunctionComponent } from 'react'

export interface ListingDetailsModalProps {
  open: boolean
  listing: Listing
  hasOffers?: boolean
  user: AuthUser | undefined
  actions?: {
    onCancel?: (listing: Listing) => unknown
    onClose?: VoidFunction
    onFill?: VoidFunction
    onViewOffers?: VoidFunction
  }
}

export const ListingDetailsModal: FunctionComponent<ListingDetailsModalProps> = ({
  open,
  listing,
  hasOffers,
  user,
  actions
}) => {
  const t = useTranslations('listing.details.modal')
  // TODO use ListingWithRole instead
  const isCreator = !isNil(user) && user.username === listing.creator.username
  return (
    <Modal
      open={open}
      title={t('title')}
      backButton={{
        label: t('backBtn'),
        onBack: actions?.onClose
      }}
      onClose={actions?.onClose}
    >
      <div className={clsx('flex', 'flex-col', 'gap-12')}>
        <ListingDetailsModalCreator show={!isCreator} listing={listing} />
        <ListingDetailsModalDetailsContainer items={listing.items} targets={listing.targets} />
        <div className={clsx('flex', 'flex-row', 'gap-4.5', 'items-center', 'justify-center')}>
          <ListingDetailsModalButtonsContainer
            listing={listing}
            hasOffers={hasOffers}
            isCreator={isCreator}
            actions={isNil(actions) ? undefined : omit(['onClose'], actions)}
          />
        </div>
      </div>
    </Modal>
  )
}
