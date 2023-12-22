import { ListingStackLayout } from '@echo/ui/components/listing/stack/layout/listing-stack-layout'
import { type FunctionComponent } from 'react'

export const ListingStackSkeleton: FunctionComponent = () => {
  return <ListingStackLayout loading={true} />
}
