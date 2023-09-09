import { NftGroupSkeleton } from '../../../group/skeleton/nft-group-skeleton'
import { NftGroupsLayout } from '../../nft-groups-layout'
import { FunctionComponent } from 'react'

export const NftGroupsContainerSkeleton: FunctionComponent = () => {
  return (
    <NftGroupsLayout>
      <NftGroupSkeleton />
      <NftGroupSkeleton />
    </NftGroupsLayout>
  )
}
