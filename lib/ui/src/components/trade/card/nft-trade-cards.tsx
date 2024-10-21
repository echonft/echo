import { TradeCardStackLayout } from '@echo/ui/components/trade/card/layout/trade-card-stack-layout'
import { TradeCardsLayout } from '@echo/ui/components/trade/card/layout/trade-cards-layout'
import { TradeCardCount } from '@echo/ui/components/trade/card/trade-card-count'
import { TradeCardPicture } from '@echo/ui/components/trade/card/trade-card-picture'
import { SwapDirection } from '@echo/ui/constants/swap-direction'
import type { Nullable } from '@echo/utils/types/nullable'
import { type FunctionComponent } from 'react'

interface Props {
  pictureURL: Nullable<string>
  alt: string
  count: number
  direction: SwapDirection
}

export const NftTradeCards: FunctionComponent<Props> = ({ pictureURL, alt, count, direction }) => {
  return (
    <TradeCardsLayout>
      {direction === SwapDirection.Out && <TradeCardCount>{count}</TradeCardCount>}
      <TradeCardStackLayout>
        <TradeCardPicture pictureURL={pictureURL} alt={alt} />
      </TradeCardStackLayout>
      {direction === SwapDirection.In && <TradeCardCount>{count}</TradeCardCount>}
    </TradeCardsLayout>
  )
}
