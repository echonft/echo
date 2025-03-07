import type { OwnedNft } from '@echo/model/types/nft'
import { EmptyTradeCard } from '@echo/ui/components/trade/card/empty-trade-card'
import { TradeCardLayout } from '@echo/ui/components/trade/card/layout/trade-card-layout'
import { NftTradeCards } from '@echo/ui/components/trade/card/nft-trade-cards'
import { TradeCardPicture } from '@echo/ui/components/trade/card/trade-card-picture'
import type { SwapDirection } from '@echo/ui/constants/swap-direction'
import { isNonEmptyArray } from '@echo/utils/helpers/is-non-empty-array'
import { head } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  items: OwnedNft[]
  direction: SwapDirection
}

export const NftTradeCard: FunctionComponent<Props> = ({ items, direction }) => {
  if (isNonEmptyArray(items)) {
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
        <TradeCardPicture src={item.pictureUrl} alt={item.tokenId.toString()} />
      </TradeCardLayout>
    )
  }
  return <EmptyTradeCard />
}
