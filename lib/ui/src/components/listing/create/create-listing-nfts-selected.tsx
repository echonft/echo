'use client'
import { type Nft } from '@echo/model/types/nft'
import { NftCards } from '@echo/ui/components/nft/card/layout/nft-cards'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
}

export const CreateListingNftsSelected: FunctionComponent<Props> = ({ nfts }) => {
  return <NftCards nfts={nfts} alignment={ALIGNMENT_CENTER} cardOptions={{ style: { hideOpenSeaLink: true } }} />
}
