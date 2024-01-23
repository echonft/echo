import type { ListingItem } from '@echo/model/types/listing-item'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { ListingDetailsTargetContainer } from '@echo/ui/components/listing/details/listing-details-target-container'
import { ListingDetailsModalItemsContainer } from '@echo/ui/components/listing/details/modal/listing-details-modal-items-container'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { clsx } from 'clsx'
import { head } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  items: ListingItem[]
  targets: ListingTarget[]
}

export const ListingDetailsModalDetailsContainer: FunctionComponent<Props> = ({ items, targets }) => {
  // Should never happen, but just in case
  if (isNilOrEmpty(targets)) {
    return null
  }
  return (
    <div className={clsx('flex', 'flex-col', 'gap-4.5', 'items-center')}>
      <ListingDetailsModalItemsContainer items={items} />
      <ItemsSeparator />
      {/*  FIXME Force unwrap */}
      <ListingDetailsTargetContainer target={head(targets)!} />
    </div>
  )
}
