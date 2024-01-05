import { CollectionNftsSkeleton } from '@echo/ui/components/collection/nft/skeleton/collection-nfts-skeleton'
import { unstable_setRequestLocale } from 'next-intl/server'
import { type FunctionComponent } from 'react'

const CollectionNftsLoading: FunctionComponent = () => {
  unstable_setRequestLocale('en')
  return <CollectionNftsSkeleton />
}

export default CollectionNftsLoading
