import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { getAuthUser } from '@echo/frontend/lib/auth/get-auth-user'
import { withFirebase } from '@echo/frontend/lib/hoc/with-firebase'
import { CollectionNftsApiProvided } from '@echo/ui/components/collection/api-provided/collection-nfts-api-provided'
import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
  }
}

const CollectionNftsPage: FunctionComponent<Props> = async ({ params: { slug } }) => {
  unstable_setRequestLocale('en')
  const user = await getAuthUser()
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

export default withFirebase(CollectionNftsPage)
