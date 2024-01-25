import { NftCardsContainerSkeleton } from '@echo/ui/components/nft/card/layout/skeleton/nft-cards-container-skeleton'
import { NftGroupLayout } from '@echo/ui/components/nft/group/layout/nft-group-layout'
import { NftGroupButtonSkeleton } from '@echo/ui/components/nft/group/skeleton/nft-group-button-skeleton'
import { type FunctionComponent } from 'react'

export const NftGroupSkeleton: FunctionComponent = () => {
  return (
    <NftGroupLayout>
      <NftGroupButtonSkeleton />
      <NftCardsContainerSkeleton />
    </NftGroupLayout>
  )
}
