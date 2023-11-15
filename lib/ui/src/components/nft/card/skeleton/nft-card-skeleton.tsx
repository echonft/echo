import { NftCardLayout } from '@echo/ui/components/nft/card/layout/nft-card-layout'
import { NftCardPictureLayout } from '@echo/ui/components/nft/card/layout/nft-card-picture-layout'
import { NftCardTitleLayout } from '@echo/ui/components/nft/card/layout/nft-card-title-layout'
import { NftCardTitleCollectionName } from '@echo/ui/components/nft/card/nft-card-title-collection-name'
import { NftCardTitleTokenId } from '@echo/ui/components/nft/card/nft-card-title-token-id'
import type { NftCardVariant } from '@echo/ui/types/nft-card-variant'
import { type FunctionComponent } from 'react'

interface Props {
  variant?: NftCardVariant
}

export const NftCardSkeleton: FunctionComponent<Props> = ({ variant }) => (
  <NftCardLayout loading={true}>
    <NftCardPictureLayout loading={true} />
    <NftCardTitleLayout variant={variant} loading={true}>
      <NftCardTitleCollectionName name={'X'} />
      <NftCardTitleTokenId tokenId={1} totalSupply={10000} />
    </NftCardTitleLayout>
  </NftCardLayout>
)
