import type { ListingDetailsModalProps } from '@echo/ui/components/listing/details/modal/listing-details-modal'
import { ListingDetailsModalButtonsContainer } from '@echo/ui/components/listing/details/modal/listing-details-modal-buttons-container'
import { ListingDetailsModalCreator } from '@echo/ui/components/listing/details/modal/listing-details-modal-creator'
import { ListingDetailsModalDetailsContainer } from '@echo/ui/components/listing/details/modal/listing-details-modal-details-container'
import { clsx } from 'clsx'
import { isNil, omit } from 'ramda'
import type { FunctionComponent } from 'react'

export const ListingDetailsModalBody: FunctionComponent<Omit<ListingDetailsModalProps, 'open'>> = ({
  listing,
  hasOffers,
  user,
  actions
}) => {
  if (isNil(listing)) {
    return null
  }
  // TODO use ListingWithRole instead
  const isCreator = listing.creator.username === user?.username
  return (
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
  )
}
