import { getListingsForCollection } from '@echo/firestore/crud/listing/get-listings-for-collection'
import { READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import { CollectionListingsApiProvided } from '@echo/ui/components/collection/api-provided/collection-listings-api-provided'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionListingsPage: FunctionComponent<Props> = async ({ params: { slug } }) => {
  unstable_setRequestLocale('en')
  const listings = await getListingsForCollection(
    slug,
    { notState: READ_ONLY_LISTING_STATES },
    {
      orderBy: [{ field: 'expiresAt', direction: 'asc' }]
    }
  )
  return <CollectionListingsApiProvided collectionSlug={slug} listings={listings} />
}

export default CollectionListingsPage
