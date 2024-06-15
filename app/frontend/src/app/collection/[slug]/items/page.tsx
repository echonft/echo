import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { withUser } from '@echo/frontend/lib/decorators/with-user'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { PropsWithUser } from '@echo/frontend/lib/types/props-with-user'
import type { WithSlug } from '@echo/model/types/with-slug'
import { NAVIGATION_NFTS } from '@echo/ui/constants/navigation-item'
import { CollectionNavigationLayout } from '@echo/ui/pages/collection/navigation/collection-navigation-layout'
import { CollectionNfts } from '@echo/ui/pages/collection/nfts/collection-nfts'
import { notFound } from 'next/navigation'
import { isNil } from 'ramda'

async function render({ params: { slug }, user }: PropsWithUser<NextParams<WithSlug>>) {
  const collection = await getCollection(slug)
  if (isNil(collection)) {
    notFound()
  }
  const nfts = await getNftsForCollection(slug, { excludeOwner: user?.username })

  return (
    <CollectionNavigationLayout slug={slug} activeNavigationItem={NAVIGATION_NFTS}>
      <CollectionNfts nfts={nfts} slug={slug} />
    </CollectionNavigationLayout>
  )
}

export default withUser(render)
