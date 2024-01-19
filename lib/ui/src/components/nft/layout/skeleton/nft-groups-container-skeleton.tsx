import { NftGroupsLayout } from '@echo/ui/components/nft/group/layout/nft-groups-layout'
import { NftGroupSkeleton } from '@echo/ui/components/nft/group/skeleton/nft-group-skeleton'
import { type FunctionComponent } from 'react'

export const NftGroupsContainerSkeleton: FunctionComponent = () => {
  return (
    <NftGroupsLayout>
      <NftGroupSkeleton />
      <NftGroupSkeleton />
    </NftGroupsLayout>
  )
}
