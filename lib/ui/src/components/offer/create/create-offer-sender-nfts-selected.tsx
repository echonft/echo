'use client'

import type { OwnedNft } from '@echo/model/types/owned-nft'
import { NftCards } from '@echo/ui/components/nft/card/nft-cards'
import { Alignment } from '@echo/ui/constants/alignments'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: OwnedNft[]
}

export const CreateOfferSenderNftsSelected: FunctionComponent<Props> = ({ nfts }) => {
  return <NftCards nfts={nfts} alignment={Alignment.Center} cardOptions={{ style: { hideOpenSeaLink: true } }} />
}
