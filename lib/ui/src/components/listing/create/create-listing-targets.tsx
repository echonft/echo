'use client'
import {
  CreateListingTargetsSelection,
  type CreateListingTargetsSelectionProps
} from '@echo/ui/components/listing/create/create-listing-targets-selection'
import { ListingDetailsTarget } from '@echo/ui/components/listing/details/listing-details-target'
import type { FunctionComponent } from 'react'

interface Props extends CreateListingTargetsSelectionProps {
  readOnly: boolean
}

export const CreateListingTargets: FunctionComponent<Props> = ({
  readOnly,
  target,
  onQtyChange,
  onRemove,
  onSelect
}) => {
  if (readOnly) {
    return <ListingDetailsTarget target={target} />
  }
  return (
    <CreateListingTargetsSelection target={target} onQtyChange={onQtyChange} onRemove={onRemove} onSelect={onSelect} />
  )
}
