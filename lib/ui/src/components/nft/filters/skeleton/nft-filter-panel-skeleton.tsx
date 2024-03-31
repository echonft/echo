import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { type FunctionComponent } from 'react'

export const NftFilterPanelSkeleton: FunctionComponent = () => {
  return <NftFiltersPanelLayout title={'Title'} loading={true} />
}
