import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { NftThumbnail } from '@echo/ui/components/nft/thumbnail/nft-thumbnail'
import { Nft } from '@echo/ui/types/model/nft'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  centered?: boolean
}
export const NftsContainer: FunctionComponent<Props> = ({ nfts, centered }) => {
  return (
    <NftsLayout centered={centered}>
      {map(
        (nft) => (
          <NftThumbnail key={nft.id} nft={nft} />
        ),
        nfts
      )}
    </NftsLayout>
  )
}
