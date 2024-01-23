import { NftCardSkeleton } from '@echo/ui/components/nft/card/skeleton/nft-card-skeleton'
import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { SwapRowLayout } from '@echo/ui/components/swap/row/layout/swap-row-layout'
import { SwapRowIcon } from '@echo/ui/components/swap/row/swap-row-icon'
import { ALIGNMENT_RIGHT } from '@echo/ui/constants/alignments'
import { type FunctionComponent } from 'react'

export const SwapRowSkeleton: FunctionComponent = () => {
  return (
    <SwapRowLayout>
      <NftsLayout>
        <NftCardSkeleton />
        <NftCardSkeleton />
      </NftsLayout>
      <SwapRowIcon />
      <NftsLayout alignment={ALIGNMENT_RIGHT}>
        <NftCardSkeleton />
        <NftCardSkeleton />
      </NftsLayout>
    </SwapRowLayout>
  )
}
