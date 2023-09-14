import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { NftThumbnail } from '@echo/ui/components/nft/thumbnail/nft-thumbnail'
import type { Nft } from '@echo/ui/types/model/nft'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: Array<Nft>
}

export const NftsContainer: FunctionComponent<Props> = ({ nfts }) => {
  return (
    <NftsLayout>
      {map(
        (nft) => (
          <NftThumbnail key={nft.id} nft={nft} />
        ),
        nfts
      )}
    </NftsLayout>
  )
}
