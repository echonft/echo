import type { ListingItem } from '@echo/model/types/listing-item'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { ListingDetailsItemsContainer } from '@echo/ui/components/listing/details/listing-details-items-container'
import { ListingDetailsTargetContainer } from '@echo/ui/components/listing/details/listing-details-target-container'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { clsx } from 'clsx'
import { head } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  items: ListingItem[]
  targets: ListingTarget[]
}

export const ListingDetailsModalDetailsContainer: FunctionComponent<Props> = ({ items, targets }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-4.5', 'items-center')}>
      <ListingDetailsItemsContainer items={items} />
      <ItemsSeparator />
      {/*  FIXME Force unwrap */}
      <ListingDetailsTargetContainer target={head(targets as NonEmptyArray<ListingTarget>)} />
    </div>
  )
}
