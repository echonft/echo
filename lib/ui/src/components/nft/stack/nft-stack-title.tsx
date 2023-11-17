import type { Nft } from '@echo/model/types/nft'
import { NftCardTitleCollectionName } from '@echo/ui/components/nft/card/nft-card-title-collection-name'
import { NftCardTitleTokenId } from '@echo/ui/components/nft/card/nft-card-title-token-id'
import { NftStackTitleLayout } from '@echo/ui/components/nft/stack/layout/nft-stack-title-layout'
import type { NftStack } from '@echo/ui/types/nft-stack'
import { type FunctionComponent } from 'react'

interface Props {
  stack: NftStack
}

export const NftStackTitle: FunctionComponent<Props> = ({ stack }) => {
  return (
    <NftStackTitleLayout>
      <NftCardTitleCollectionName nft={{ collection: stack.collection } as Nft} />
      <NftCardTitleTokenId nft={{ collection: stack.collection, tokenId: stack.tokenId } as Nft} />
    </NftStackTitleLayout>
  )
}
