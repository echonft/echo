'use client'
import { type Nft } from '@echo/model/types/nft'
import { NftCards } from '@echo/ui/components/nft/card/layout/nft-cards'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'

interface Props<T extends Nft> {
  nfts: T[]
}

export const CreateListingNftsSelected = <T extends Nft>({ nfts }: Props<T>) => {
  return <NftCards nfts={nfts} alignment={ALIGNMENT_CENTER} cardOptions={{ style: { hideOpenSeaLink: true } }} />
}
