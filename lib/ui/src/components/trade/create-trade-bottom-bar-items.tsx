import type { ListingTarget } from '@echo/model/types/listing-target'
import type { OwnedNft } from '@echo/model/types/nft'
import { SelectableNftThumbnails } from '@echo/ui/components/nft/selectable-thumbnail/selectable-nft-thumbnails'
import { CreateTradeBottomBarItemsLayout } from '@echo/ui/components/trade/layout/create-trade-bottom-bar-items-layout'
import { type FunctionComponent } from 'react'

interface Props {
  items: OwnedNft[]
  target?: ListingTarget
  counterpartyItems?: OwnedNft[]
}

export const CreateTradeBottomBarItems: FunctionComponent<Props> = ({ items, target, counterpartyItems }) => {
  return (
    <CreateTradeBottomBarItemsLayout>
      <SelectableNftThumbnails nfts={items} onRemove={onUnselect} />
    </CreateTradeBottomBarItemsLayout>
  )
}
