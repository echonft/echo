import { NftGroupSkeleton } from '@echo/ui/components/nft/group/skeleton/nft-group-skeleton'
import { NftGroupsLayout } from '@echo/ui/components/nft/layout/nft-groups-layout'
import type { FunctionComponent } from 'react'

export const NftGroupsContainerSkeleton: FunctionComponent = () => {
  return (
    <NftGroupsLayout>
      <NftGroupSkeleton />
      <NftGroupSkeleton />
    </NftGroupsLayout>
  )
}
