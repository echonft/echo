import type { Nft } from '@echo/model/types/nft'
import { ListingCardLayout } from '@echo/ui/components/listing/card/layout/listing-card-layout'
import { NftCardPictureLayout } from '@echo/ui/components/nft/card/layout/nft-card-picture-layout'
import { NftCardTitleLayout } from '@echo/ui/components/nft/card/layout/nft-card-title-layout'
import { NftCardTitleCollectionName } from '@echo/ui/components/nft/card/nft-card-title-collection-name'
import { NftCardTitleTokenId } from '@echo/ui/components/nft/card/nft-card-title-token-id'
import { type FunctionComponent } from 'react'

export const ListingCardSkeleton: FunctionComponent = () => {
  const nft = {
    collection: {
      name: 'Placeholder',
      totalSupply: 1000
    },
    tokenId: 1
  } as Nft
  return (
    <ListingCardLayout loading={true}>
      <NftCardPictureLayout loading={true} />
      <NftCardTitleLayout loading={true}>
        <NftCardTitleCollectionName nft={nft} />
        <NftCardTitleTokenId nft={nft} />
      </NftCardTitleLayout>
    </ListingCardLayout>
  )
}
