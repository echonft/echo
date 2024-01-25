import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { CollectionNftsApiProvided } from '@echo/ui/components/collection/api-provided/collection-nfts-api-provided'
import { notFound } from 'next/navigation'
import { isNil, pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<Record<'slug', string>>>
async function render({ params: { slug }, user }: Params) {
  const collection = await findCollectionBySlug(slug)
  if (isNil(collection)) {
    notFound()
  }
  const nfts = await getNftsForCollection(slug)
  return <CollectionNftsApiProvided collection={collection} nfts={nfts} user={user} />
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
