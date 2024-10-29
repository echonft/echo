import type { Collection } from '@echo/model/types/collection'
import { EmptyTradeCard } from '@echo/ui/components/trade/card/empty-trade-card'
import { TradeCardLayout } from '@echo/ui/components/trade/card/layout/trade-card-layout'
import { TradeCardsLayout } from '@echo/ui/components/trade/card/layout/trade-cards-layout'
import { TradeCardCount } from '@echo/ui/components/trade/card/trade-card-count'
import { TradeCardPicture } from '@echo/ui/components/trade/card/trade-card-picture'
import { SwapDirection } from '@echo/ui/constants/swap-direction'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

export interface Props {
  targetCollection: Nullable<Collection>
  targetQuantity: Nullable<number>
  direction: SwapDirection
}

export const TargetTradeCard: FunctionComponent<Props> = ({ targetCollection, targetQuantity, direction }) => {
  if (isNil(targetCollection) || isNil(targetQuantity)) {
    return <EmptyTradeCard />
  }

  return (
    <TradeCardsLayout>
      {direction === SwapDirection.Out && <TradeCardCount>{targetQuantity}</TradeCardCount>}
      <TradeCardLayout>
        <TradeCardPicture pictureURL={targetCollection.pictureUrl} alt={targetCollection.name} />
      </TradeCardLayout>
      {direction === SwapDirection.In && <TradeCardCount>{targetQuantity}</TradeCardCount>}
    </TradeCardsLayout>
  )
}
