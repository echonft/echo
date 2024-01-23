import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import type { Listing } from '@echo/model/types/listing'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { ListingDetailsApiProvided } from '@echo/ui/components/listing/api-provided/listing-details-api-provided'
import { isIn } from '@echo/utils/fp/is-in'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { notFound } from 'next/navigation'
import { isNil, map, path, pipe, prop } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<Record<'id', string> & Record<'slug', string>>>

async function render({ params: { slug, id }, user }: Params) {
  const collection = await findCollectionBySlug(slug)
  if (isNil(collection)) {
    notFound()
  }
  const listing = await findListingById(id)
  if (isNil(listing)) {
    notFound()
  }
  const listingSlugs = pipe<[Listing], ListingTarget[], string[]>(
    prop('targets'),
    map(nonNullableReturn(path(['collection', 'slug'])))
  )(listing)
  if (!isIn(listingSlugs, slug)) {
    notFound()
  }
  return <ListingDetailsApiProvided listing={listing} user={user} />
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
