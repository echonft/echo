import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import {
  getNftsForCollection,
  type GetNftsForCollectionOptions
} from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { NextUserParams } from '@echo/frontend/lib/types/next-user-params'
import type { WithSlug } from '@echo/model/types/with-slug'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { NFT_ACTION_OFFER } from '@echo/ui/constants/nft-actions'
import { CollectionNavigationLayout } from '@echo/ui/pages/collection/navigation/collection-navigation-layout'
import { CollectionNfts } from '@echo/ui/pages/collection/nfts/collection-nfts'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { notFound } from 'next/navigation'
import { andThen, assoc, isNil, map, pipe } from 'ramda'
import type { ReactElement } from 'react'

type Params = NextUserParams<NextParams<WithSlug>>

async function render({ params: { slug }, user }: Params) {
  const collection = await getCollection(slug)
  if (isNil(collection)) {
    notFound()
  }
  const nfts: SelectableNft[] = await pipe(
    getNftsForCollection as (slug: string, options?: GetNftsForCollectionOptions) => Promise<SelectableNft[]>,
    andThen(map<SelectableNft, SelectableNft>(assoc('action', NFT_ACTION_OFFER)))
  )(slug, { excludeOwner: user?.username })

  return (
    <CollectionNavigationLayout slug={slug} activeNavigationItem={NAVIGATION_NFTS}>
      <CollectionNfts nfts={nfts} slug={slug} />
    </CollectionNavigationLayout>
  )
}

export default pipe(withLocale<Params, Promise<ReactElement>>, withUser)(render)
