import { getOffersForCollection } from '@echo/firestore/crud/offer/get-offers-for-collection'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { CollectionSwapsApiProvided } from '@echo/ui/components/collection/api-provided/collection-swaps-api-provided'

export default async function ({ params: { slug } }: NextParams<Record<'slug', string>>) {
  await initializeServerComponent({ initializeFirebase: true })
  const offers = await getOffersForCollection(
    slug,
    { state: [OFFER_STATE_COMPLETED] },
    {
      orderBy: [{ field: 'expiresAt', direction: 'asc' }]
    }
  )
  return <CollectionSwapsApiProvided collectionSlug={slug} offers={offers} />
}
