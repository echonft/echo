import { getOffersForCollection } from '@echo/firestore/crud/offer/get-offers-for-collection'
import { withFirebase } from '@echo/frontend/lib/decorators/with-firebase'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { CollectionSwapsApiProvided } from '@echo/ui/components/collection/api-provided/collection-swaps-api-provided'
import { pipe } from 'ramda'

async function render({ params: { slug } }: NextParams<Record<'slug', string>>) {
  const offers = await getOffersForCollection(
    slug,
    { state: [OFFER_STATE_COMPLETED] },
    {
      orderBy: [{ field: 'expiresAt', direction: 'asc' }]
    }
  )
  return <CollectionSwapsApiProvided collectionSlug={slug} offers={offers} />
}

export default pipe(withLocale, withFirebase)(render)
