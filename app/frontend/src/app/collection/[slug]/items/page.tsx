import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { CollectionNftsApiProvided } from '@echo/ui/components/collection/api-provided/collection-nfts-api-provided'
import { notFound } from 'next/navigation'
import { isNil } from 'ramda'

export default async function ({ params: { slug } }: NextParams<Record<'slug', string>>) {
  const user = await initializeServerComponent({ getAuthUser: true })
  const collection = await findCollectionBySlug(slug)
  if (isNil(collection)) {
    notFound()
  }
  const nfts = await getNftsForCollection(slug, {
    orderBy: [
      { field: 'owner.discord.username', direction: 'asc' },
      { field: 'tokenId', direction: 'asc' }
    ]
  })
  return <CollectionNftsApiProvided collection={collection} nfts={nfts} user={user} />
}
