import type { NftItem } from '@echo/model/types/item'
import { TradeDetailsBottomBarItemImage } from '@echo/ui/components/trade/trade-details-bottom-bar-item-image'
import { nftLabel } from '@echo/ui/helpers/nft/nft-label'
import { type FunctionComponent } from 'react'

interface Props {
  item: NftItem
}

export const TradeDetailsBottomBarNftItem: FunctionComponent<Props> = ({ item: { token } }) => {
  return <TradeDetailsBottomBarItemImage alt={nftLabel(token)} src={token.pictureUrl} />
}
