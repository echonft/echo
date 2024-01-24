import { getCompletedOffersForCollection } from '@echo/firestore/crud/offer/get-completed-offers-for-collection'
import { withFirebase } from '@echo/frontend/lib/decorators/with-firebase'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { CollectionSwapsApiProvided } from '@echo/ui/components/collection/api-provided/collection-swaps-api-provided'
import { pipe } from 'ramda'

async function render({ params: { slug } }: NextParams<Record<'slug', string>>) {
  const offers = await getCompletedOffersForCollection(slug)
  return <CollectionSwapsApiProvided collectionSlug={slug} offers={offers} />
}

export default pipe(withLocale, withFirebase)(render)
