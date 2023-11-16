import type { Nft } from '@echo/model/types/nft'
import { NftCardTitleCollectionName } from '@echo/ui/components/nft/card/nft-card-title-collection-name'
import { NftCardTitleTokenId } from '@echo/ui/components/nft/card/nft-card-title-token-id'
import { NftStackTitleLayout } from '@echo/ui/components/nft/stack/layout/nft-stack-title-layout'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
}

export const NftStackTitle: FunctionComponent<Props> = ({ nft }) => {
  return (
    <NftStackTitleLayout>
      <NftCardTitleCollectionName nft={nft} />
      <NftCardTitleTokenId nft={nft} />
    </NftStackTitleLayout>
  )
}
