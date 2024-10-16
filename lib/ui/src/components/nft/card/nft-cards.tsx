import { type Nft } from '@echo/model/types/nft/nft'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { NftCard, type NftCardProps } from '@echo/ui/components/nft/card/nft-card'
import { keyOf } from '@echo/ui/components/nft/key-of'
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
        (nft) => (
          <NftCard key={keyOf(nft)} nft={nft} options={cardOptions} />
        ),
        nfts
      )}
    </CardsLayout>
  )
}
