import { type Nft } from '@echo/model/types/nft'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { NftCard, type NftCardProps } from '@echo/ui/components/nft/card/nft-card'
import type { Alignment } from '@echo/ui/types/alignment'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  alignment?: Alignment
  cardOptions?: NftCardProps['options']
}
export const NftCards: FunctionComponent<Props> = ({ nfts, alignment, cardOptions }) => {
  return (
    <CardsLayout alignment={alignment}>
      {map(
        // TODO Validate this behaviour (key)
        (nft) => (
          <NftCard key={`${nft.collection.name}-${nft.tokenId}`} nft={nft} options={cardOptions} />
        ),
        nfts
      )}
    </CardsLayout>
  )
}
