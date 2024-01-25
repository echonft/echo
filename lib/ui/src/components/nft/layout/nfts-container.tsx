import { type Nft } from '@echo/model/types/nft'
import { NftCard, type NftCardProps } from '@echo/ui/components/nft/card/nft-card'
import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import type { Alignment } from '@echo/ui/types/alignment'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  alignment?: Alignment
  cardOptions?: NftCardProps['options']
}
export const NftsContainer: FunctionComponent<Props> = ({ nfts, alignment, cardOptions }) => {
  return (
    <NftsLayout alignment={alignment}>
      {map(
        (nft) => (
          <NftCard key={nft.id} nft={nft} options={cardOptions} />
        ),
        nfts
      )}
    </NftsLayout>
  )
}
