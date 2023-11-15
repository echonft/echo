import { NftGroupLayout } from '@echo/ui/components/nft/group/layout/nft-group-layout'
import { NftGroupButtonSkeleton } from '@echo/ui/components/nft/group/skeleton/nft-group-button-skeleton'
import { NftsContainerSkeleton } from '@echo/ui/components/nft/layout/container/skeleton/nfts-container-skeleton'
import { type FunctionComponent } from 'react'

export const NftGroupSkeleton: FunctionComponent = () => {
  return (
    <NftGroupLayout>
      <NftGroupButtonSkeleton />
      <NftsContainerSkeleton />
    </NftGroupLayout>
  )
}
