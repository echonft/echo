import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { NftThumbnail } from '@echo/ui/components/nft/thumbnail/nft-thumbnail'
import { AlignmentCenter, AlignmentLeft, AlignmentRight } from '@echo/ui/constants/alignment'
import { Nft } from '@echo/ui/types/model/nft'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  alignment?: typeof AlignmentLeft | typeof AlignmentCenter | typeof AlignmentRight
}
export const NftsContainer: FunctionComponent<Props> = ({ nfts, alignment }) => {
  return (
    <NftsLayout alignment={alignment}>
      {map(
        (nft) => (
          <NftThumbnail key={nft.id} nft={nft} />
        ),
        nfts
      )}
    </NftsLayout>
  )
}
