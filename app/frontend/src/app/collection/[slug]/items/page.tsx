import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { CollectionNavigationLayout } from '@echo/ui/pages/collection/navigation/collection-navigation-layout'
import { CollectionNfts } from '@echo/ui/pages/collection/nfts/collection-nfts'
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
  return (
    <CollectionNavigationLayout slug={slug} activeNavigationItem={NAVIGATION_NFTS}>
      <CollectionNfts collection={collection} nfts={nfts} user={user} />
    </CollectionNavigationLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
