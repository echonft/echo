import { SelectableNftGroupsLayout } from '@echo/ui/components/nft/group/layout/selectable-nft-groups-layout'
import { NftGroupSkeleton } from '@echo/ui/components/nft/group/skeleton/nft-group-skeleton'
import { type FunctionComponent } from 'react'

export const NftGroupsSkeleton: FunctionComponent = () => {
  return (
    <SelectableNftGroupsLayout>
      <NftGroupSkeleton />
      <NftGroupSkeleton />
    </SelectableNftGroupsLayout>
  )
}
