'use client'
import {
  CreateListingTargetsSelection,
  type CreateListingTargetsSelectionProps
} from '@echo/ui/components/listing/create/create-listing-targets-selection'
import { ListingDetailsTargetContainer } from '@echo/ui/components/listing/details/listing-details-target-container'
import type { FunctionComponent } from 'react'

interface Props extends CreateListingTargetsSelectionProps {
  readOnly: boolean
}

export const CreateListingTargets: FunctionComponent<Props> = ({
  collections,
  readOnly,
  target,
  onQtyChange,
  onRemove,
  onSelection
}) => {
  if (readOnly) {
    return <ListingDetailsTargetContainer target={target!} />
  }
  return (
    <CreateListingTargetsSelection
      collections={collections}
      target={target}
      onQtyChange={onQtyChange}
      onRemove={onRemove}
      onSelection={onSelection}
    />
  )
}
