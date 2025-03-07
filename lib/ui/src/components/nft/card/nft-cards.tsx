import { serializeNft } from '@echo/model/serializers/serialize-nft'
import { type Nft } from '@echo/model/types/nft'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { NftCard, type NftCardProps } from '@echo/ui/components/nft/card/nft-card'
import type { Alignment } from '@echo/ui/constants/alignments'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  alignment?: Alignment
  options?: NftCardProps['options']
}

export const NftCards: FunctionComponent<Props> = ({ nfts, alignment, options }) => {
  return (
    <CardsLayout alignment={alignment}>
      {map(
        (nft) => (
          <NftCard key={serializeNft(nft)} nft={nft} options={options} />
        ),
        nfts
      )}
    </CardsLayout>
  )
}
