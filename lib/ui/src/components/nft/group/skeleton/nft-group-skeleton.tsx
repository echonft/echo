import { NftCardsContainerSkeleton } from '@echo/ui/components/nft/card/layout/skeleton/nft-cards-container-skeleton'
import { SelectableNftGroupCollapsibleLayout } from '@echo/ui/components/nft/group/layout/selectable-nft-group-collapsible-layout'
import { NftGroupButtonSkeleton } from '@echo/ui/components/nft/group/skeleton/nft-group-button-skeleton'
import { type FunctionComponent } from 'react'

export const NftGroupSkeleton: FunctionComponent = () => {
  return (
    <SelectableNftGroupCollapsibleLayout>
      <NftGroupButtonSkeleton />
      <NftCardsContainerSkeleton />
    </SelectableNftGroupCollapsibleLayout>
  )
}
