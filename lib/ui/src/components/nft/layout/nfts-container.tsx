import { type Nft } from '@echo/model/types/nft'
import { NftCard } from '@echo/ui/components/nft/card/nft-card'
import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { ALIGNMENT_CENTER, ALIGNMENT_LEFT, ALIGNMENT_RIGHT } from '@echo/ui/constants/alignments'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  alignment?: typeof ALIGNMENT_LEFT | typeof ALIGNMENT_CENTER | typeof ALIGNMENT_RIGHT
}
export const NftsContainer: FunctionComponent<Props> = ({ nfts, alignment }) => {
  return (
    <NftsLayout alignment={alignment}>
      {map(
        (nft) => (
          <NftCard key={nft.id} nft={nft} />
        ),
        nfts
      )}
    </NftsLayout>
  )
}
