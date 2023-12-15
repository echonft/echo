import { NftCardSkeleton } from '@echo/ui/components/nft/card/skeleton/nft-card-skeleton'
import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { type FunctionComponent } from 'react'

export const NftsContainerSkeleton: FunctionComponent = () => {
  return (
    <NftsLayout>
      <NftCardSkeleton />
      <NftCardSkeleton />
      <NftCardSkeleton />
      <NftCardSkeleton />
    </NftsLayout>
  )
}
