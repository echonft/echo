import { NftThumbnail } from '../../thumbnail/nft-thumbnail'
import { NftsLayout } from '../nfts-layout'
import { Nft } from '@echo/ui-model'
import { map } from 'ramda'
import { FunctionComponent } from 'react'

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
