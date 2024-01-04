import { CollectionListingsSkeleton } from '@echo/ui/components/collection/listing/skeleton/collection-listings-skeleton'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const CollectionListingsLoading: FunctionComponent = () => {
  unstable_setRequestLocale('en')
  return <CollectionListingsSkeleton />
}

export default CollectionListingsLoading
