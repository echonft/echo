import { NftsContainerSkeleton } from '../../layout/container/skeleton/nfts-container-skeleton'
import { NftGroupLayout } from '../../layout/nft-group-layout'
import { NftGroupButtonSkeleton } from './nft-group-button-skeleton'
import { FunctionComponent } from 'react'

export const NftGroupSkeleton: FunctionComponent = () => {
  return (
    <NftGroupLayout>
      <NftGroupButtonSkeleton />
      <NftsContainerSkeleton />
    </NftGroupLayout>
  )
}
