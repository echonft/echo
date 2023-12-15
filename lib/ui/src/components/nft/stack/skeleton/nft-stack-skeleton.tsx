import { NftStackLayout } from '@echo/ui/components/nft/stack/layout/nft-stack-layout'
import { type FunctionComponent } from 'react'

export const NftStackSkeleton: FunctionComponent = () => {
  return <NftStackLayout loading={true} />
}
