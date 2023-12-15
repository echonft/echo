import type { Nft } from '@echo/model/types/nft'
import { NftCardTitleLayout } from '@echo/ui/components/nft/card/layout/nft-card-title-layout'
import { NftCardTitleCollectionName } from '@echo/ui/components/nft/card/nft-card-title-collection-name'
import { NftCardTitleTokenId } from '@echo/ui/components/nft/card/nft-card-title-token-id'
import type { NftCardVariant } from '@echo/ui/types/nft-card-variant'
import { type FunctionComponent } from 'react'

interface Props {
  nft: Nft
  variant?: NftCardVariant
}

export const NftCardTitle: FunctionComponent<Props> = ({ nft, variant }) => {
  return (
    <NftCardTitleLayout variant={variant}>
      <NftCardTitleCollectionName nft={nft} />
      <NftCardTitleTokenId nft={nft} />
    </NftCardTitleLayout>
  )
}
