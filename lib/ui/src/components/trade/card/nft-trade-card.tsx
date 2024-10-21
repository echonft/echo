import type { Nft } from '@echo/model/types/nft/nft'
import { TradeCardLayout } from '@echo/ui/components/trade/card/layout/trade-card-layout'
import { NftTradeCards } from '@echo/ui/components/trade/card/nft-trade-cards'
import { TradeCardPicture } from '@echo/ui/components/trade/card/trade-card-picture'
import type { SwapDirection } from '@echo/ui/constants/swap-direction'
import { head, type NonEmptyArray } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  items: NonEmptyArray<Nft>
  direction: SwapDirection
}

export const NftTradeCard: FunctionComponent<Props> = ({ items, direction }) => {
  const item = head(items)
  if (items.length > 1) {
    return (
      <NftTradeCards
        pictureURL={item.pictureUrl}
        alt={item.tokenId.toString()}
        direction={direction}
        count={items.length}
      />
    )
  }
  return (
    <TradeCardLayout>
      <TradeCardPicture pictureURL={item.pictureUrl} alt={item.tokenId.toString()} />
    </TradeCardLayout>
  )
}
