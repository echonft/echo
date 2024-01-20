import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { getAuthUser } from '@echo/frontend/lib/helpers/auth/get-auth-user'
import type { Listing } from '@echo/model/types/listing'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { ListingDetailsApiProvided } from '@echo/ui/components/listing/api-provided/listing-details-api-provided'
import { isIn } from '@echo/utils/fp/is-in'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { isNil, map, path, pipe, prop } from 'ramda'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  params: {
    slug: string
    id: string
  }
}

const ListingDetailsPage: FunctionComponent<PropsWithChildren<Props>> = async ({ params: { id, slug } }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
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

export default ListingDetailsPage
