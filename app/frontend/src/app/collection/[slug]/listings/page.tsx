import { getListingsForCollection } from '@echo/firestore/crud/listing/get-listings-for-collection'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { READ_ONLY_LISTING_STATES } from '@echo/model/constants/listing-states'
import { CollectionListingsApiProvided } from '@echo/ui/components/collection/api-provided/collection-listings-api-provided'

async function render({ params: { slug } }: NextParams<Record<'slug', string>>) {
  await initializeServerComponent({ initializeFirebase: true })
  const listings = await getListingsForCollection(
    slug,
    { notState: READ_ONLY_LISTING_STATES },
    {
      orderBy: [{ field: 'expiresAt', direction: 'asc' }]
    }
  )
  return <CollectionListingsApiProvided collectionSlug={slug} listings={listings} />
}

export default withLocale(render)
